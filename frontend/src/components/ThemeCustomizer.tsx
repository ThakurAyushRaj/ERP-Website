import React from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/theme";
import type { ThemeKey } from "../utils/theme";

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
}) => {
  const { theme, setTheme } = useTheme();

  if (!isOpen) return null;

  const keys = Object.keys(THEMES) as ThemeKey[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Choose Theme</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Close theme customizer"
          >
            Close
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-400">
          Pick a preset color theme for the ERP workspace.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {keys.map((key) => {
            const t = THEMES[key];
            const isActive = theme === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={`rounded-xl border p-4 text-left transition ${
                  isActive
                    ? "border-white/40 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{t.name}</span>
                  {isActive && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                      Active
                    </span>
                  )}
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${t.accentGradient}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
