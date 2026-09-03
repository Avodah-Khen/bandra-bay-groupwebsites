'use client';

import { useMemo, useState } from 'react';
import { calculateEmi, EMI_LIMITS, EmiValidationError } from '@/lib/emi';

function formatCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(8_000_000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [tenureYears, setTenureYears] = useState(20);
  const [logged, setLogged] = useState(false);

  const result = useMemo(() => {
    try {
      return { ok: true as const, value: calculateEmi({ loanAmount, annualInterestRate: interestRate, tenureYears }) };
    } catch (err) {
      return { ok: false as const, error: err instanceof EmiValidationError ? err.message : 'Invalid input' };
    }
  }, [loanAmount, interestRate, tenureYears]);

  function handleCalculated() {
    if (logged || !result.ok) return;
    setLogged(true);
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'emi_calculated', metadata: { loanAmount, interestRate, tenureYears } }),
    }).catch(() => {});
  }

  return (
    <div className="card grid gap-8 p-6 md:grid-cols-2 md:p-8">
      <div className="space-y-6">
        <Slider label="Loan Amount" value={loanAmount} min={EMI_LIMITS.minLoanAmount} max={EMI_LIMITS.maxLoanAmount} step={100000} display={formatCurrency(loanAmount)} onChange={(v) => { setLoanAmount(v); handleCalculated(); }} minLabel="₹1 Lac" maxLabel="₹8 Cr" />
        <Slider label="Interest Rate (% p.a.)" value={interestRate} min={EMI_LIMITS.minInterestRate} max={EMI_LIMITS.maxInterestRate} step={0.05} display={`${interestRate.toFixed(2)}%`} onChange={(v) => { setInterestRate(v); handleCalculated(); }} minLabel="1%" maxLabel="30%" />
        <Slider label="Loan Tenure" value={tenureYears} min={EMI_LIMITS.minTenureYears} max={EMI_LIMITS.maxTenureYears} step={1} display={`${tenureYears} Years`} onChange={(v) => { setTenureYears(v); handleCalculated(); }} minLabel="1 Year" maxLabel="30 Years" />
      </div>

      <div className="flex flex-col justify-center gap-4 border-t border-ink/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        {!result.ok ? (
          <p className="text-sm text-red-600" role="alert">{result.error}</p>
        ) : (
          <>
            <div>
              <p className="eyebrow">Your Monthly Home EMI</p>
              <p className="font-display text-4xl font-semibold text-deep">{formatCurrency(result.value.monthlyEmi)}</p>
            </div>
            <dl className="grid grid-cols-3 gap-3 text-sm">
              <div className="card p-3">
                <dt className="text-ink/50">Principal</dt>
                <dd className="font-medium">{formatCurrency(result.value.principal)}</dd>
              </div>
              <div className="card p-3">
                <dt className="text-ink/50">Interest</dt>
                <dd className="font-medium">{formatCurrency(result.value.totalInterest)}</dd>
              </div>
              <div className="card p-3">
                <dt className="text-ink/50">Total Payable</dt>
                <dd className="font-medium">{formatCurrency(result.value.totalPayable)}</dd>
              </div>
            </dl>
          </>
        )}
        <p className="text-xs text-ink/50">
          This calculator is indicative only. Please consult your lender or bank for exact
          eligibility, rates, and terms before making a financial decision.
        </p>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange, minLabel, maxLabel }: {
  label: string; value: number; min: number; max: number; step: number; display: string;
  onChange: (v: number) => void; minLabel: string; maxLabel: string;
}) {
  const id = `emi-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="label mb-0">{label}</label>
        <span className="text-sm font-semibold text-deep">{display}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-gold" />
      <div className="mt-1 flex justify-between text-xs text-ink/40">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
