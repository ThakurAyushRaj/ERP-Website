import type { Employee, InventoryItem, SalesOrder } from "../types/erp";

export const STORAGE_KEYS = {
  employees: "erp-employees",
  inventory: "erp-inventory",
  orders: "erp-orders",
} as const;

const seedEmployees: Employee[] = [
  {
    id: "EMP-001",
    name: "Aisha Mehta",
    role: "Operations Manager",
    department: "Operations",
    email: "aisha@Ayusherp.com",
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Rohan Verma",
    role: "Finance Analyst",
    department: "Finance",
    email: "rohan@Ayusherp.com",
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Sara Khan",
    role: "Procurement Lead",
    department: "Supply Chain",
    email: "sara@Ayusherp.com",
    status: "Inactive",
  },
];

const seedInventory: InventoryItem[] = [
  {
    id: "ITM-001",
    name: "Industrial Router",
    sku: "RTR-IND-01",
    stock: 42,
    reorderLevel: 15,
    unitPrice: 12999,
  },
  {
    id: "ITM-002",
    name: "Barcode Scanner",
    sku: "SCN-BRC-09",
    stock: 11,
    reorderLevel: 20,
    unitPrice: 3999,
  },
  {
    id: "ITM-003",
    name: "POS Terminal",
    sku: "POS-TRM-21",
    stock: 7,
    reorderLevel: 10,
    unitPrice: 18999,
  },
];

const seedOrders: SalesOrder[] = [
  {
    id: "SO-2026-101",
    customer: "Nimbus Retail",
    amount: 125000,
    status: "Paid",
    date: "2026-03-02",
  },
  {
    id: "SO-2026-102",
    customer: "Vertex Logistics",
    amount: 76000,
    status: "Pending",
    date: "2026-03-06",
  },
  {
    id: "SO-2026-103",
    customer: "Atlas Stores",
    amount: 221000,
    status: "Shipped",
    date: "2026-02-25",
  },
];

function seedIfMissing<T>(key: string, value: T) {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function initializeERPData() {
  seedIfMissing(STORAGE_KEYS.employees, seedEmployees);
  seedIfMissing(STORAGE_KEYS.inventory, seedInventory);
  seedIfMissing(STORAGE_KEYS.orders, seedOrders);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function monthLabel(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}
