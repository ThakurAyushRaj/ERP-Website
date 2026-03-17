import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Inline SVG icons ──────────────────────────────────────────────────────
const GridIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const PersonIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
);
const BoxIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M5 8h14M5 8a2 2 0 010-4h14a2 2 0 010 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CartIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChartIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ShieldIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ZapIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M13 10V3L4 14h7v7l9-11h-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TrendIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
);
const CloseIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────
const modules = [
  {
    title: "Analytics Dashboard",
    description:
      "Real-time KPIs, revenue trends, low-stock alerts, and full operational overviews in one place.",
    icon: <GridIcon />,
    to: "/app/dashboard",
    tag: "Analytics",
  },
  {
    title: "Employee Management",
    description:
      "Manage your team directory, assign roles and departments, toggle active/inactive access.",
    icon: <PersonIcon />,
    to: "/app/users",
    tag: "HR",
  },
  {
    title: "Inventory Control",
    description:
      "Track SKUs, monitor stock levels, receive goods, and get automated reorder level alerts.",
    icon: <BoxIcon />,
    to: "/app/inventory",
    tag: "Supply Chain",
  },
  {
    title: "Sales Orders",
    description:
      "Create orders, manage status lifecycle (Pending → Paid → Shipped), and monitor total revenue.",
    icon: <CartIcon />,
    to: "/app/orders",
    tag: "Sales",
  },
  {
    title: "Reports & Exports",
    description:
      "Monthly revenue analysis, custom date filters, trend bars, and one-click CSV export.",
    icon: <ChartIcon />,
    to: "/app/reports",
    tag: "Finance",
  },
];

const homeLayout = {
  modulesGrid: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
  moduleCard:
    "relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/8 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group-hover:border-cyan-300/70 group-hover:bg-white/12 group-hover:shadow-[0_20px_55px_rgba(34,211,238,0.35)]",
  moduleTag:
    "mb-3 inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
  moduleIcon:
    "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/10",
};

const moduleThemeByTag: Record<string, string> = {
  Analytics: "text-cyan-400",
  HR: "text-sky-400",
  "Supply Chain": "text-emerald-400",
  Sales: "text-violet-400",
  Finance: "text-orange-400",
};

const solutionCards = [
  {
    title: "Finance",
    value: "₹4,22,000",
    sub: "Total Revenue Tracked",
    from: "from-cyan-500/20",
    to: "to-cyan-500/5",
  },
  {
    title: "Human Resources",
    value: "3",
    sub: "Employees Onboarded",
    from: "from-blue-500/20",
    to: "to-blue-500/5",
  },
  {
    title: "Inventory",
    value: "3 SKUs",
    sub: "Active Items in Stock",
    from: "from-emerald-500/20",
    to: "to-emerald-500/5",
  },
  {
    title: "Sales Orders",
    value: "3",
    sub: "Orders Processed",
    from: "from-violet-500/20",
    to: "to-violet-500/5",
  },
];

const whyItems = [
  {
    icon: <ShieldIcon />,
    title: "Enterprise Security",
    description:
      "Secure local storage, compliance-ready architecture, and role-based data access controls.",
  },
  {
    icon: <ZapIcon />,
    title: "Lightning Fast",
    description:
      "Entirely frontend-powered with zero server latency — instant interactions and updates.",
  },
  {
    icon: <TrendIcon />,
    title: "Real-Time Analytics",
    description:
      "Live dashboards that reflect every change instantly across finance, HR, inventory, and sales.",
  },
  {
    icon: <GridIcon />,
    title: "Unified Platform",
    description:
      "Five powerful ERP modules in one suite — no more switching between disconnected tools.",
  },
  {
    icon: <PersonIcon />,
    title: "User-Centric Design",
    description:
      "A clean, intuitive interface your team will actually enjoy. No steep learning curve required.",
  },
  {
    icon: <ChartIcon />,
    title: "Data-Driven Growth",
    description:
      "Turn raw business data into actionable insights with automated reports and trend analysis.",
  },
];

const stats = [
  { value: "5", label: "ERP Modules" },
  { value: "∞", label: "Data Records" },
  { value: "100%", label: "Availability" },
  { value: "0ms", label: "Server Latency" },
];

// ─── Component ────────────────────────────────────────────────────────────
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-hidden text-white antialiased"
      style={{ backgroundColor: "#000000" }}
    >
      {/* ══════════════ NAVBAR ══════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 backdrop-blur-xl"
        style={{ backgroundColor: "rgba(1, 1, 16, 0.11)" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-black text-white shadow-lg shadow-cyan-500/30">
              A
            </span>
            <div className="leading-none">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-400">
                Ayush
              </p>
              <p className="text-sm font-bold text-white">ERP </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
           <a
            href="#solutions"
             className="group relative text-sm text-slate-400 transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
           >
             Solutions
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
           </a>

           <a
            href="#modules"
            className="group relative text-sm text-slate-400 transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
            >
             Modules
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
           </a>

           <a
            href="#why"
            className="group relative text-sm text-slate-400 transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
           >
            Why Us
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
           </a>
          </nav>

          <div className="flex items-center gap-3">

                 <Link
            to="/app/dashboard"
             className="group relative text-sm font-semibold text-slate-400 transition duration-300 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
             >
                    Enter ERP →
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
           </Link>

            <button
            type="button"
             onClick={() => setMenuOpen(!menuOpen)}
           className="rounded-lg p-2 text-slate-400 transition hover:text-white hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] md:hidden"
           >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
           </button>

          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="border-t border-white/5 px-4 py-4 md:hidden"
            style={{ backgroundColor: "#09090f" }}
          >
            <nav className="flex flex-col gap-2">
              <a
                href="#solutions"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Solutions
              </a>
              <a
                href="#modules"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Modules
              </a>
              <a
                href="#why"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Why Us
              </a>
              <Link
                to="/app/dashboard"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-cyan-600 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Enter ERP →
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative flex min-h-screen items-center pt-16">
        {/* Background effects */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-600/10 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-[500px] w-[400px] rounded-full bg-blue-700/10 blur-3xl" />
          <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-700/10 blur-3xl" />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left */}
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                All-in-One Enterprise ERP Solution
              </span>

              <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Revolutionizing
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Business
                </span>
                Operations
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
                Ayush ERP unifies Finance, HR, Inventory, and Sales into one
                powerful frontend suite. Track operations in real-time and make
                data-driven decisions — no backend required.
              </p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Real-time Analytics",
                  "Zero Server Latency",
                  "Secure Local Storage",
                ].map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 text-sm text-slate-400"
                  >
                    <span className="text-cyan-400">
                      <CheckIcon />
                    </span>{" "}
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/app/dashboard"
                   className="group mb-3 rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                
                  Enter Dashboard →
                </Link>
                <a
                  href="#modules"
                   className="group mb-3 rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                
                  View Modules
                </a>
              </div>
            </div>

    {/* Right: Dashboard mockup */}
    <div className="hidden lg:block">
    <div className="group relative">
    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-sm opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />
    <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d1a] p-5 shadow-2xl
                    transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]
                    hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(34,211,238,0.35)]">
   {/* Window chrome */}
  <div className="group mb-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">

    <div className="mb-4 flex items-center justify-between">
    
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 transition group-hover:bg-red-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 transition group-hover:bg-amber-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 transition group-hover:bg-emerald-500" />
    </div>

    <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-slate-400 transition group-hover:text-cyan-300">
      Ayush ERP / Dashboard
    </span>

    </div>

  </div>

    {/* KPI cards */}
  <div className="mb-4 grid grid-cols-2 gap-3">
        {[
        { label: "Revenue", value: "₹4,22,000" },
        { label: "Orders", value: "3 Total" },
        { label: "Active Employees", value: "2" },
        { label: "Low Stock", value: "2 Alerts" },
          ].map((kpi) => (
       <div
      key={kpi.label}
      className="group rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]"
    >
      <p className="text-xs text-slate-400 transition group-hover:text-slate-300">
        {kpi.label}
      </p>

      <p className="mt-1 text-sm font-bold text-white transition group-hover:text-cyan-300">
        {kpi.value}
      </p>
    </div>
     ))}
  </div>

   {/* Mini bar chart */}
   <div className="group mb-4 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
  
         <p className="mb-3 text-xs text-slate-400 transition group-hover:text-cyan-300">
         Revenue Trend
         </p>

        <div className="flex h-16 items-end gap-1.5">
        {[40, 65, 50, 80, 58, 90, 72].map((h, i) => (
          <div
           key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-cyan-600 to-blue-500 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-105"
             style={{ height: `${h}%` }}
             />
             ))}
         </div>

  </div>

     {/* Mini table */}
     <div className="group rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">

           <p className="mb-2 text-xs text-slate-400 transition group-hover:text-cyan-300">
             Recent Orders
               </p>

                 {[
                   {
                 name: "Nimbus Retail",
                 amount: "₹1,25,000",
                 status: "Paid",
                 paid: true,
                  },
                  {
                 name: "Vertex Logistics",
                 amount: "₹76,000",
                 status: "Pending",
                 paid: false,
                 },
                ].map((row) => (
              <div
                key={row.name}
                 className="flex items-center justify-between border-t border-white/5 py-1.5 transition-all duration-200 group-hover:border-white/10"
                 >
                  <span className="text-xs text-slate-300 transition group-hover:text-white">
                  {row.name}
                </span>

                   <span className="text-xs font-semibold text-white transition group-hover:text-cyan-300">
                 {row.amount}
                 </span>

                     <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${
              row.paid
            ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30"
            : "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
             }`}
             >
             {row.status}
           </span>
             </div>
            ))}

    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS BAR ══════════════ */}
    <section
  className="border-y border-white/5 py-12"
  style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/10 hover:shadow-[0_0_50px_rgba(34,211,238,0.35)]"
        >

          {/* value */}
          <p className="text-4xl font-black text-white transition duration-300 group-hover:text-cyan-300">
            {stat.value}
          </p>

          {/* label */}
          <p className="mt-2 text-sm text-slate-400 transition duration-300 group-hover:text-slate-300">
            {stat.label}
          </p>

        </div>
      ))}

    </div>

  </div>
</section>
      {/* ══════════════ SOLUTIONS ══════════════ */}
      <section id="solutions" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                Why ERP?
              </span>
              <h2 className="text-4xl font-black leading-tight text-white">
                Specialized ERP for
                <span className="block text-slate-400">Modern Business</span>
              </h2>
              <p className="mt-4 leading-relaxed text-slate-400">
                Ayush ERP brings together Finance, Human Resources, Inventory
                Control, and Sales Operations into a unified, intelligent
                platform. Eliminate data silos, manual processes, and scattered
                spreadsheets.
              </p>
              <ul className="mt-6 mb-7 space-y-3">
                {[
                  "Automated order and workflow management",
                  "Real-time inventory alerts and reorder tracking",
                  "Integrated sales and finance reporting",
                  "Secure employee directory and role management",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/app/dashboard"
               className="group mb-3 rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                Explore ERP →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {solutionCards.map((card) => (
                <div
                  key={card.title}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-cyan-300/60 hover:shadow-[0_18px_45px_rgba(34,211,238,0.22)] ${card.from} ${card.to}`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/18 via-white/4 to-transparent opacity-35 transition duration-300 group-hover:opacity-55"
                  />
                  <p className="relative text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition duration-300 group-hover:text-slate-300">
                    {card.title}
                  </p>
                  <p className="relative mt-3 text-2xl font-black text-white transition duration-300 group-hover:text-cyan-300">
                    {card.value}
                  </p>
                  <p className="relative mt-1 text-xs text-slate-500 transition duration-300 group-hover:text-slate-300">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MODULES ══════════════ */}
      <section
        id="modules"
        className="py-24"
        style={{ backgroundColor: "rgba(255,255,255,0.015)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              ERP Modules
            </span>
            <h2 className="text-4xl font-black text-white">
              Powerful Modules.
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                One Platform.
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Five interconnected modules giving you complete visibility and
              control over every aspect of your business.
            </p>
          </div>

          <div className={homeLayout.modulesGrid}>
            {modules.map((mod) => {
              const themeClass = moduleThemeByTag[mod.tag] ?? "text-cyan-400";

              return (
                <Link
                  key={mod.to}
                  to={mod.to}
                  className="group block text-center"
                >
                  <div className={homeLayout.moduleCard}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-35"
                    />

                    <div
                      className={`${homeLayout.moduleIcon} icon-bounce-on-hover mx-auto ${themeClass}`}
                    >
                      {mod.icon}
                    </div>

                    <span
                      className={`${homeLayout.moduleTag} border-white/20 bg-white/10 text-slate-300`}
                    >
                      {mod.tag}
                    </span>

                    <h3 className="text-lg font-semibold text-white">
                      {mod.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {mod.description}
                    </p>

                    <span
                      className={`mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold ${themeClass}`}
                    >
                      Open Module →
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* CTA card */}
            <Link to="/app/dashboard" className="group block text-center">
              <div className={homeLayout.moduleCard}>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-35"
                />

                <div
                  className={`${homeLayout.moduleIcon} icon-bounce-on-hover mx-auto text-cyan-400`}
                >
                  <GridIcon />
                </div>

                <span
                  className={`${homeLayout.moduleTag} border-white/20 bg-white/10 text-slate-300`}
                >
                  Quick Start
                </span>

                <h3 className="text-lg font-semibold text-white">
                  Ready to explore?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Open the live dashboard and start managing your business
                  operations from the analytics command center.
                </p>

                <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-cyan-400">
                  Enter ERP →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE ══════════════ */}
      <section id="why" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
              Why Ayush ERP
            </span>
            <h2 className="text-4xl font-black text-white">
              The ERP Advantage
            </h2>
            <p className="mt-4 text-slate-400">
              Experience the power of a specialized ERP designed to simplify
              workflows and accelerate growth for modern businesses.
            </p>
          </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {whyItems.map((item) => (
      <div
      key={item.title}
      className="group text-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
      transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]
      hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]"
    >

      {/* ICON */}
     <div
        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center
        rounded-xl border border-white/10 bg-white/10 text-cyan-400
        transition-all duration-500 ease-out
        group-hover:-translate-y-2 group-hover:scale-110"
      >
        {item.icon}
      </div>

      {/* TITLE */}
      <h3 className="text-base font-bold text-white transition duration-300 group-hover:text-cyan-300">
        {item.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm leading-relaxed text-slate-400 transition group-hover:text-slate-300">
        {item.description}
      </p>

    </div>
    ))}
  </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="py-24">
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

    <div
      className="group relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center backdrop-blur-xl
      bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01]
      hover:border-cyan-400 hover:shadow-[0_0_70px_rgba(34,211,238,0.35)] md:p-16"
    >

      {/* Glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      />

      {/* Badge */}
      <span className="relative mb-4 inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
        Get Started Today
      </span>

      {/* Title */}
      <h2 className="relative mt-2 text-4xl font-black leading-tight text-white md:text-5xl">
        Ready to Transform Your
        <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Business Efficiency?
        </span>
      </h2>

      {/* Description */}
      <p className="relative mx-auto mt-5 max-w-xl text-slate-400">
        Join businesses that trust Ayush ERP to organize data, automate
        tasks, and drive growth — all from one powerful, real-time dashboard.
      </p>

      {/* Buttons */}
      <div className="relative mt-8 flex flex-wrap justify-center gap-4">

        <Link
          to="/app/dashboard"
          className="group rounded-full border border-white/10 bg-white/10 px-6 py-3
          font-semibold text-white backdrop-blur-md transition-all duration-300
          hover:border-cyan-400 hover:bg-white/15
          hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        >
          Enter Dashboard →
        </Link>

        <a
          href="#modules"
          className="group rounded-full border border-white/10 bg-white/10 px-6 py-3
          font-semibold text-white backdrop-blur-md transition-all duration-300
          hover:border-cyan-400 hover:bg-white/15
          hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        >
          Explore Modules
        </a>

      </div>

    </div>
  </div>
</section>
      {/* ══════════════ FOOTER ══════════════ */}
      <footer
        className="border-t border-white/5 py-16"
        style={{ backgroundColor: "#06060d" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-black text-white shadow-lg shadow-cyan-500/20">
                  NS
                </span>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-400">
                    Ayush
                  </p>
                  <p className="text-sm font-bold text-white">ERP Suite</p>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
               ERP, Finance, HR, Inventory, and Sales —
                all in one place.
              </p>
            </div>

            {/* Modules */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Modules
              </p>
              <ul className="space-y-2.5">
                {modules.map((mod) => (
                  <li key={mod.to}>
                    <Link
                      to={mod.to}
                      className="text-sm text-slate-500 transition hover:text-white"
                    >
                      {mod.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

              {/* Contact */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Contact
              </p>
              <ul className="space-y-2.5">
                {[
                  "Email: support@ayusherp.com",
                  "Phone: +1 (123) 456-7890",
                  "Address: 123 Ayush St, Tech City, TX",
                ].map((contact) => (
                  <li key={contact} className="text-sm text-slate-500">
                    {contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 sm:flex-row">
            <p className="text-sm text-slate-600">
              © 2026 Ayush ERP. All rights reserved.
            </p>
            <p className="text-sm text-slate-600">
               Ayush
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
