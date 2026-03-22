import type { THEMES } from "../utils/theme";
import type { ThemeKey } from "../utils/theme";

type Theme = (typeof THEMES)[ThemeKey];

type KpiCardProps = {
  title: string;
  value: string;
  hint: string;
  theme: Theme;
};

const KpiCard = ({ title, value, hint, theme: t }: KpiCardProps) => {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${t.accentBorder} ${t.accentGlow}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>
      <p className={`mt-2 text-3xl font-black ${t.accentText}`}>{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
};

export default KpiCard;
