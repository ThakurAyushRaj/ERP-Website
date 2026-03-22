import { useMemo, useState } from "react";
import KpiCard from "../components/KpiCard";
import { useTheme } from "../context/ThemeContext";
import { STORAGE_KEYS, formatCurrency } from "../utils/erpStore";
import { THEMES } from "../utils/theme";
import { usePersistentState } from "../utils/usePersistentState";
import type { InventoryItem } from "../types/erp";

const Inventory = () => {
  const { theme } = useTheme();
  const t = THEMES[theme];

  const [items, setItems] = usePersistentState<InventoryItem[]>(
    STORAGE_KEYS.inventory,
    [],
  );
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(5);
  const [unitPrice, setUnitPrice] = useState(1000);

  const lowStockCount = useMemo(
    () => items.filter((item) => item.stock <= item.reorderLevel).length,
    [items],
  );

  const outOfStockCount = useMemo(
    () => items.filter((item) => item.stock === 0).length,
    [items],
  );

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.stock * item.unitPrice, 0),
    [items],
  );

  const onAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !sku.trim()) {
      return;
    }

    const newItem: InventoryItem = {
      id: `ITM-${Date.now()}`,
      name: name.trim(),
      sku: sku.trim(),
      stock,
      reorderLevel,
      unitPrice,
    };

    setItems((prev) => [newItem, ...prev]);
    setName("");
    setSku("");
    setStock(0);
    setReorderLevel(5);
    setUnitPrice(1000);
  };

  const receiveStock = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: item.stock + 10 } : item,
      ),
    );
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <span className={`mb-3 inline-flex items-center gap-2 rounded-full border ${t.badgeBorder} ${t.badgeBg} px-3 py-1 text-xs font-semibold ${t.badgeText}`}>
          <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${t.badgeDot}`} />
          Warehouse Pulse
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white">Inventory Control</h2>
        <p className="mt-1 text-slate-400">Manage stock levels, restocks, and SKU valuation.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total SKUs" value={String(items.length)} hint="Tracked products" theme={t} />
        <KpiCard title="Low Stock" value={String(lowStockCount)} hint="At reorder threshold" theme={t} />
        <KpiCard title="Out of Stock" value={String(outOfStockCount)} hint="Requires immediate action" theme={t} />
        <KpiCard title="Inventory Value" value={formatCurrency(totalValue)} hint="Current on-hand value" theme={t} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${t.accentBorder} ${t.accentGlow}`}>
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className={`text-lg font-semibold ${t.accentText}`}>Inventory Register</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Reorder</th>
                  <th className="px-4 py-3 font-medium">Unit Price</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const low = item.stock <= item.reorderLevel;
                  return (
                    <tr key={item.id} className="border-t border-white/5 transition hover:bg-white/[0.05]">
                      <td className="px-4 py-3 font-medium text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{item.sku}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            low
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {item.reorderLevel}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => receiveStock(item.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${t.activeBg} ${t.activeText} hover:bg-white/15`}
                        >
                          Receive +10
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                      No inventory items yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <form
          onSubmit={onAddItem}
          className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${t.accentBorder}`}
        >
          <h2 className={`text-lg font-semibold ${t.accentText}`}>Add SKU</h2>
          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Item name"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              placeholder="SKU"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              required
            />
            <input
              type="number"
              value={stock}
              onChange={(event) => setStock(Number(event.target.value))}
              placeholder="Current stock"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              min={0}
            />
            <input
              type="number"
              value={reorderLevel}
              onChange={(event) => setReorderLevel(Number(event.target.value))}
              placeholder="Reorder level"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              min={1}
            />
            <input
              type="number"
              value={unitPrice}
              onChange={(event) => setUnitPrice(Number(event.target.value))}
              placeholder="Unit price"
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none"
              min={1}
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full rounded-lg bg-gradient-to-r px-4 py-2 font-semibold text-white ${t.accentGradient}`}
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
