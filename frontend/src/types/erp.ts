export type EmployeeStatus = "Active" | "Inactive";

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: EmployeeStatus;
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
};

export type OrderStatus = "Pending" | "Paid" | "Shipped";

export type SalesOrder = {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

export type AuthUser = {
  name: string;
  role: string;
};
