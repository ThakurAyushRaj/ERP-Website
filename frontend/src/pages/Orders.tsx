import { useMemo, useState } from "react";
import KpiCard from "../components/KpiCard";
import { useTheme } from "../context/ThemeContext";
import { STORAGE_KEYS, formatCurrency } from "../utils/erpStore";
import { THEMES } from "../utils/theme";
import { usePersistentState } from "../utils/usePersistentState";
import type { OrderStatus, SalesOrder } from "../types/erp";

const statusOrder: OrderStatus[] = ["Pending", "Paid", "Shipped"];

const nextStatus = (current: OrderStatus): OrderStatus => {
  const index = statusOrder.indexOf(current);
  return statusOrder[(index + 1) % statusOrder.length];
};

const Orders = () => {
  const { theme } = useTheme();
  const t = THEMES[theme];

  const [orders, setOrders] = usePersistentState<SalesOrder[]>(
    STORAGE_KEYS.orders,
    [],
  );
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState(10000);

  const totals = useMemo(() => {
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
      pendingCount: orders.filter((order) => order.status === "Pending").length,
      paidCount: orders.filter((order) => order.status === "Paid").length,
    };
  }, [orders]);

  const onCreateOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customer.trim() || amount <= 0) {
      return;
    }

    const newOrder: SalesOrder = {
      id: `SO-${Date.now()}`,
      customer: customer.trim(),
      amount,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCustomer("");
    setAmount(10000);
  };

  const cycleStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: nextStatus(order.status) }
          : order,
      ),
    );
  };

  const statusBadge = (status: OrderStatus) => {
    if (status === "Pending") return "bg-amber-500/20 text-amber-300";
    if (status === "Paid") return "bg-sky-500/20 text-sky-300";
    return "bg-emerald-500/20 text-emerald-300";
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} ${t.badgeBg} px-3 py-1 text-xs font-semibold ${t.badgeText}`}>
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.badgeDot}`} />
          Sales Flow
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white">Order Pipeline</h2>
        <p className="mt-1 text-slate-400">Create and track customer orders from pending to shipment.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Orders" value={String(totals.totalOrders)} hint="Total entries" theme={t} />
        <KpiCard title="Revenue" value={formatCurrency(totals.totalRevenue)} hint="Order book value" theme={t} />
        <KpiCard title="Pending" value={String(totals.pendingCount)} hint="Awaiting payment" theme={t} />
        <KpiCard title="Paid" value={String(totals.paidCount)} hint="Ready for shipment" theme={t} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${t.accentBorder} ${t.accentGlow}`}>
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className={`text-lg font-semibold ${t.accentText}`}>Sales Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-white/5 transition hover:bg-white/[0.05]">
                    <td className="px-4 py-3 font-medium text-white">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {order.customer}
                    </td>
                    <td className={`px-4 py-3 ${t.accentText}`}>
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{order.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusBadge(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => cycleStatus(order.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${t.activeBg} ${t.activeText} hover:bg-white/15`}
                      >
                        Next Status
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                      No orders created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <form
          onSubmit={onCreateOrder}
          className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${t.accentBorder}`}
        >
          <h2 className={`text-lg font-semibold ${t.accentText}`}>Create Order</h2>
          <div className="mt-4 space-y-3">
            <input
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              placeholder="Customer name"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="Order amount"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              min={1}
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full rounded-lg bg-gradient-to-r px-4 py-2 font-semibold text-white ${t.accentGradient}`}
          >
            Add Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Orders;
