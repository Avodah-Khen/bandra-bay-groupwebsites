export default function MiniBarChart({
  data,
  labelKey,
  valueKey,
}: {
  data: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
}) {
  const max = Math.max(1, ...data.map((d) => Number(d[valueKey]) || 0));
  if (data.length === 0) {
    return <p className="text-sm text-white/30">No data yet.</p>;
  }
  return (
    <div className="space-y-3">
      {data.map((d, i) => {
        const value = Number(d[valueKey]) || 0;
        const pct = Math.round((value / max) * 100);
        return (
          <div key={i}>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span className="truncate max-w-[70%] capitalize">{String(d[labelKey]).replace(/_/g, " ")}</span>
              <span className="font-semibold text-white">{value}</span>
            </div>
            <div className="h-2 bg-white/5 w-full rounded-full overflow-hidden">
              <div className="h-2 bg-accent-gradient rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
