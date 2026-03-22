import { useMemo, useState } from "react";
import KpiCard from "../components/KpiCard";
import { useTheme } from "../context/ThemeContext";
import { STORAGE_KEYS, formatCurrency, monthLabel } from "../utils/erpStore";
import { THEMES } from "../utils/theme";
import { usePersistentState } from "../utils/usePersistentState";
import type { SalesOrder } from "../types/erp";

const barWidthClass = (ratio: number) => {
  if (ratio >= 0.95) return "w-full";
  if (ratio >= 0.85) return "w-5/6";
  if (ratio >= 0.75) return "w-3/4";
  if (ratio >= 0.65) return "w-2/3";
  if (ratio >= 0.55) return "w-7/12";
  if (ratio >= 0.45) return "w-1/2";
  if (ratio >= 0.35) return "w-2/5";
  if (ratio >= 0.25) return "w-1/3";
  if (ratio >= 0.15) return "w-1/4";
  return "w-1/6";
};

const Reports = () => {
  const { theme } = useTheme();
  const t = THEMES[theme];

  const [orders] = usePersistentState<SalesOrder[]>(STORAGE_KEYS.orders, []);
  const [monthFilter, setMonthFilter] = useState("all");

  const monthOptions = useMemo(() => {
    const months = Array.from(
      new Set(orders.map((order) => order.date.slice(0, 7))),
    );
    return months.sort().reverse();
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (monthFilter === "all") {
      return orders;
    }

    return orders.filter((order) => order.date.startsWith(monthFilter));
  }, [monthFilter, orders]);

  const totals = useMemo(() => {
    const totalRevenue = filteredOrders.reduce(
      (sum, order) => sum + order.amount,
      0,
    );
    const paidRevenue = filteredOrders
      .filter((order) => order.status === "Paid")
      .reduce((sum, order) => sum + order.amount, 0);

    return {
      totalRevenue,
      paidRevenue,
      orders: filteredOrders.length,
    };
  }, [filteredOrders]);

  const monthlyMap = useMemo(() => {
    const map = new Map<string, number>();

    for (const order of filteredOrders) {
      const label = monthLabel(order.date);
      map.set(label, (map.get(label) ?? 0) + order.amount);
    }

    return Array.from(map.entries());
  }, [filteredOrders]);

  const maxValue = Math.max(...monthlyMap.map(([, value]) => value), 1);

  const downloadCSV = () => {
    const header = "Order ID,Customer,Amount,Status,Date";
    const rows = filteredOrders.map(
      (order) =>
        `${order.id},${order.customer},${order.amount},${order.status},${order.date}`,
    );

    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "erp-sales-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} ${t.badgeBg} px-3 py-1 text-xs font-semibold ${t.badgeText}`}>
            <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.badgeDot}`} />
            Finance Analytics
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white">Sales Reports</h2>
          <p className="text-sm text-slate-400">
            Filter by month and export report to CSV.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            aria-label="Filter report by month"
            value={monthFilter}
            onChange={(event) => setMonthFilter(event.target.value)}
            className={`rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white backdrop-blur focus:outline-none ${t.accentBorder}`}
          >
            <option value="all">All Months</option>
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={downloadCSV}
            className={`rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white ${t.accentGradient}`}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Orders" value={String(totals.orders)} hint="For current filter" theme={t} />
        <KpiCard title="Total Revenue" value={formatCurrency(totals.totalRevenue)} hint="Gross sales" theme={t} />
        <KpiCard title="Paid Revenue" value={formatCurrency(totals.paidRevenue)} hint="Confirmed cash-in" theme={t} />
        <KpiCard title="Collection Rate" value={`${totals.totalRevenue === 0 ? 0 : Math.round((totals.paidRevenue / totals.totalRevenue) * 100)}%`} hint="Paid vs total" theme={t} />
      </div>

      <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${t.accentBorder} ${t.accentGlow}`}>
        <h3 className={`text-lg font-semibold ${t.accentText}`}>Revenue Trend</h3>
        <div className="mt-4 space-y-3">
          {monthlyMap.length === 0 && (
            <p className="text-sm text-slate-500">
              No report data available for this filter.
            </p>
          )}

          {monthlyMap.map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-white">{label}</span>
                <span className={`${t.accentText}`}>{formatCurrency(value)}</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${t.accentGradient} ${barWidthClass(value / maxValue)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
