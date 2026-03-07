import { Order } from "@/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "SW-2024-0892",
    product: "FireGuard FR-18",
    category: "FireGuard (FR)",
    qty: "200 sheets",
    value: 84000,
    status: "Dispatched",
    eta: "14 Mar",
    date: "2024-03-10",
    destination: "Dubai, UAE",
    paymentTerm: "LC 90 Days",
  },
  {
    id: "SW-2024-0891",
    product: "MoistureSeal Plus 15mm",
    category: "MoistureSeal",
    qty: "150 sheets",
    value: 52500,
    status: "Processing",
    eta: "18 Mar",
    date: "2024-03-09",
    destination: "Abu Dhabi, UAE",
    paymentTerm: "Net 30",
  },
  {
    id: "SW-2024-0890",
    product: "Chipboard 18mm FSC",
    category: "Chipboard",
    qty: "500 sheets",
    value: 21000,
    status: "Confirmed",
    eta: "20 Mar",
    date: "2024-03-08",
    destination: "Sharjah, UAE",
    paymentTerm: "Net 60",
  },
  {
    id: "SW-2024-0889",
    product: "Acoustic Board 12mm",
    category: "Acoustic",
    qty: "80 sheets",
    value: 28800,
    status: "Delivered",
    eta: "Delivered",
    date: "2024-03-05",
    destination: "Riyadh, KSA",
    paymentTerm: "Net 30",
  },
  {
    id: "SW-2024-0888",
    product: "MDF 16mm Standard",
    category: "MDF",
    qty: "300 sheets",
    value: 36000,
    status: "Awaiting LC",
    eta: "25 Mar",
    date: "2024-03-04",
    destination: "Kuwait City, Kuwait",
    paymentTerm: "LC 60 Days",
  },
  {
    id: "SW-2024-0887",
    product: "FireGuard FR-12",
    category: "FireGuard (FR)",
    qty: "120 sheets",
    value: 45600,
    status: "Delivered",
    eta: "Delivered",
    date: "2024-02-28",
    destination: "Doha, Qatar",
    paymentTerm: "Net 45",
  },
];

export async function getOrders(filters?: Record<string, string>): Promise<Order[]> {
  await new Promise((r) => setTimeout(r, 400));
  let orders = [...MOCK_ORDERS];
  if (filters?.status && filters.status !== "All") {
    orders = orders.filter((o) => o.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    orders = orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
    );
  }
  return orders;
}

export async function getOrder(id: string): Promise<Order | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_ORDERS.find((o) => o.id === id) || null;
}

export async function createOrder(order: Partial<Order>): Promise<Order> {
  await new Promise((r) => setTimeout(r, 600));
  return { ...order, id: `SW-2024-${Math.floor(Math.random() * 9000 + 1000)}` } as Order;
}
