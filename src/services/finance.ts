import { Invoice, CreditAccount } from "@/types";

const MOCK_INVOICES: Invoice[] = [
  {
    id: "INV-2025-0341",
    orderId: "SW-2024-0892",
    amount: 84000,
    vatAmount: 4200,
    currency: "AED",
    status: "Due Soon",
    issueDate: "2025-03-01",
    dueDate: "2025-03-15",
    items: [
      { description: "FireGuard FR-18 (200 sheets)", qty: 200, unit: "sheet", unitPrice: 420, total: 84000 },
    ],
  },
  {
    id: "INV-2025-0340",
    orderId: "SW-2024-0891",
    amount: 52500,
    vatAmount: 2625,
    currency: "AED",
    status: "Overdue",
    issueDate: "2025-02-20",
    dueDate: "2025-03-05",
    items: [
      { description: "MoistureSeal Plus 15mm (150 sheets)", qty: 150, unit: "sheet", unitPrice: 350, total: 52500 },
    ],
  },
  {
    id: "INV-2025-0339",
    orderId: "SW-2024-0890",
    amount: 21000,
    vatAmount: 1050,
    currency: "AED",
    status: "Paid",
    issueDate: "2025-02-15",
    dueDate: "2025-03-01",
    items: [
      { description: "Chipboard 18mm FSC (500 sheets)", qty: 500, unit: "sheet", unitPrice: 42, total: 21000 },
    ],
  },
  {
    id: "INV-2025-0338",
    orderId: "SW-2024-0889",
    amount: 28800,
    vatAmount: 1440,
    currency: "AED",
    status: "Paid",
    issueDate: "2025-02-10",
    dueDate: "2025-02-25",
    items: [
      { description: "Acoustic Board 12mm (80 sheets)", qty: 80, unit: "sheet", unitPrice: 360, total: 28800 },
    ],
  },
  {
    id: "INV-2025-0337",
    orderId: "SW-2024-0888",
    amount: 104500,
    vatAmount: 5225,
    currency: "AED",
    status: "Overdue",
    issueDate: "2025-02-01",
    dueDate: "2025-02-28",
    items: [
      { description: "MDF 16mm Standard (300 sheets)", qty: 300, unit: "sheet", unitPrice: 120, total: 36000 },
      { description: "Freight & Handling", qty: 1, unit: "lot", unitPrice: 68500, total: 68500 },
    ],
  },
];

export const MOCK_CREDIT_ACCOUNT: CreditAccount = {
  limit: 500000,
  used: 241000,
  available: 259000,
  currency: "AED",
  paymentTerms: "Net 60",
  overdueAmount: 157000,
  nextDueDate: "2025-03-15",
};

export async function getInvoices(): Promise<Invoice[]> {
  await new Promise((r) => setTimeout(r, 350));
  return MOCK_INVOICES;
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_INVOICES.find((i) => i.id === id) || null;
}

export async function getCreditAccount(): Promise<CreditAccount> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_CREDIT_ACCOUNT;
}
