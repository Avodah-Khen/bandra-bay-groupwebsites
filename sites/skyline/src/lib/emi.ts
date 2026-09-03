export type EmiInput = {
  loanAmount: number;
  annualInterestRate: number;
  tenureYears: number;
};

export type EmiResult = {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
  principal: number;
};

export const EMI_LIMITS = {
  minLoanAmount: 100_000,
  maxLoanAmount: 80_000_000,
  minInterestRate: 1,
  maxInterestRate: 30,
  minTenureYears: 1,
  maxTenureYears: 30,
};

export class EmiValidationError extends Error {}

function clamp(value: number, min: number, max: number, label: string): number {
  if (!Number.isFinite(value)) throw new EmiValidationError(`${label} must be a valid number`);
  if (value < min) throw new EmiValidationError(`${label} must be at least ${min}`);
  if (value > max) throw new EmiValidationError(`${label} must be at most ${max}`);
  return value;
}

/**
 * Standard reducing-balance EMI formula:
 *   EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 * where P = principal, r = monthly interest rate (annual / 12 / 100), n = number of monthly installments.
 */
export function calculateEmi(input: EmiInput): EmiResult {
  const principal = clamp(input.loanAmount, EMI_LIMITS.minLoanAmount, EMI_LIMITS.maxLoanAmount, 'Loan amount');
  const annualRate = clamp(input.annualInterestRate, EMI_LIMITS.minInterestRate, EMI_LIMITS.maxInterestRate, 'Interest rate');
  const years = clamp(input.tenureYears, EMI_LIMITS.minTenureYears, EMI_LIMITS.maxTenureYears, 'Loan tenure');

  const monthlyRate = annualRate / 12 / 100;
  const numPayments = Math.round(years * 12);

  let monthlyEmi: number;
  if (monthlyRate === 0) {
    monthlyEmi = principal / numPayments;
  } else {
    const factor = Math.pow(1 + monthlyRate, numPayments);
    monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayable = monthlyEmi * numPayments;
  const totalInterest = totalPayable - principal;

  return {
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    principal: Math.round(principal),
  };
}
