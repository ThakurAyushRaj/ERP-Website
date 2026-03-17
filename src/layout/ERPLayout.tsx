import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/theme";
import type { ThemeKey } from "../utils/theme";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "Users", to: "/app/users" },
  { label: "Inventory", to: "/app/inventory" },
  { label: "Orders", to: "/app/orders" },
  { label: "Reports", to: "/app/reports" },
];

const ERPLayout = () => {
  const { theme, setTheme } = useTheme();
  const t = THEMES[theme];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <div className="grid min-h-screen w-full lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className="hidden flex-col border-round border-white/5 lg:flex"
          style={{ backgroundColor: t.sidebarBg }}
        >
          {/* Logo */}
          <div className="border-b border-white/5 p-5">
            <Link to="/" className="flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${t.accentGradient} text-xs font-black text-white shadow-lg`}>
                AS
              </span>
              <div className="leading-none">
                <p className={`text-[10px] font-semibold tracking-[0.2em] ${t.accentText}`}>
                  Ayush
                </p>
                <p className="text-sm font-bold text-white">ERP Suite</p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? `${t.activeBg} ${t.activeText}`
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Back to home */}
          <div className="border-t border-white/5 p-4">
            <Link
              to="/"
              className={`group mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white ${t.accentBorder} ${t.accentGlow}`}
            >
              ← Back to Home
            </Link>
          </div>
        </aside>

        <main className="flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-black/80 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 lg:hidden">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${t.accentGradient} text-[10px] font-black text-white`}>
                  AS
                </span>
              </Link>
              <p className="font-semibold text-white">Ayush ERP</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                aria-label="Select theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as ThemeKey)}
                className={`rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 backdrop-blur transition-all duration-300 hover:bg-white/10 focus:outline-none ${t.accentBorder} ${t.accentGlow}`}
              >
                {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-white">
                    {THEMES[key].name}
                  </option>
                ))}
              </select>

                <Link
            to="/"
            className={`group mb-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white ${t.accentBorder} ${t.accentGlow}`}
          >
                ← Home
              </Link>
            </div>
          </header>

          <section className="flex-1 bg-black p-6">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ERPLayout;
