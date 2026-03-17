import { useMemo } from "react";
import KpiCard from "../components/KpiCard";
import { STORAGE_KEYS, formatCurrency, monthLabel } from "../utils/erpStore";
import { usePersistentState } from "../utils/usePersistentState";
import { THEMES } from "../utils/theme";
import { useTheme } from "../context/ThemeContext";
import type { Employee, InventoryItem, SalesOrder } from "../types/erp";

const Dashboard = () => {
  const { theme } = useTheme();
  const t = THEMES[theme];

  const [employees] = usePersistentState<Employee[]>(STORAGE_KEYS.employees, []);
  const [inventory] = usePersistentState<InventoryItem[]>(STORAGE_KEYS.inventory, []);
  const [orders] = usePersistentState<SalesOrder[]>(STORAGE_KEYS.orders, []);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const activeEmployees = employees.filter((emp) => emp.status === "Active").length;
    const lowStock = inventory.filter((item) => item.stock <= item.reorderLevel).length;
    return { revenue, activeEmployees, lowStock, orders: orders.length };
  }, [employees, inventory, orders]);

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div>
        <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} ${t.badgeBg} px-3 py-1 text-xs font-semibold ${t.badgeText}`}>
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.badgeDot}`} />
          ERP Command Center
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white">
          Operations Dashboard
        </h2>
        <p className="mt-1 text-slate-400">
          Track operations across HR, inventory, finance, and sales.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Revenue" value={formatCurrency(metrics.revenue)} hint="Total order value" theme={t} />
        <KpiCard title="Orders" value={String(metrics.orders)} hint="Sales orders logged" theme={t} />
        <KpiCard title="Active Employees" value={String(metrics.activeEmployees)} hint="Currently available team" theme={t} />
        <KpiCard title="Low Stock Alerts" value={String(metrics.lowStock)} hint="SKUs below reorder" theme={t} />
      </div>

      {/* Panels */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Orders */}
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 ${t.accentBorder} ${t.accentGlow}`}>
          <h3 className={`text-lg font-semibold ${t.accentText}`}>Recent Orders</h3>
          <div className="mt-4 space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-white/10 hover:bg-white/[0.08]"
              >
                <div>
                  <p className="font-medium text-white">{order.customer}</p>
                  <p className="text-xs text-slate-400">{monthLabel(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${t.accentText}`}>{formatCurrency(order.amount)}</p>
                  <p className="text-xs text-slate-400">{order.status}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-500">No orders yet</p>
            )}
          </div>
        </div>

        {/* Inventory Snapshot */}
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 ${t.accentBorder} ${t.accentGlow}`}>
          <h3 className={`text-lg font-semibold ${t.accentText}`}>Inventory Snapshot</h3>
          <div className="mt-4 space-y-2">
            {inventory.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-white/10 hover:bg-white/[0.08]"
              >
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.sku}</p>
                </div>
                <p className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  item.stock <= item.reorderLevel
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {item.stock} in stock
                </p>
              </div>
            ))}
            {inventory.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-500">No inventory yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
