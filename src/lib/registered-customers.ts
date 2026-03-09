// Server-side in-memory customer registry (resets on cold start — demo only)
// In production, replace with a database adapter.

export interface RegisteredCustomer {
  id: string;
  companyName: string;
  tradeLicense: string;
  trn: string;
  contactName: string;
  email: string;
  password: string; // plain-text for demo only
  phone: string;
  country: string;
  businessType: string;
  estimatedMonthlyVolume: string;
  creditLimit: number;
  creditUsed: number;
  paymentTerms: string;
  status: "pending" | "active" | "suspended";
  joinedAt: string;
}

// Pre-seeded demo customers (always available even after cold start)
const SEEDED: RegisteredCustomer[] = [
  {
    id: "CUST-001",
    companyName: "Al Futtaim Interiors LLC",
    tradeLicense: "DED-123456",
    trn: "100234567800003",
    contactName: "Ahmed Al Rashid",
    email: "ahmed@alfuttaim-int.ae",
    password: "customer1",
    phone: "+971 50 123 4567",
    country: "UAE",
    businessType: "Fit-Out",
    estimatedMonthlyVolume: "AED 200,000–500,000",
    creditLimit: 300000,
    creditUsed: 48000,
    paymentTerms: "Net 30",
    status: "active",
    joinedAt: "2025-01-15",
  },
  {
    id: "CUST-002",
    companyName: "Emaar Properties PJSC",
    tradeLicense: "DED-987654",
    trn: "100876543200001",
    contactName: "Sara Al Maktoum",
    email: "sara@emaar.ae",
    password: "customer2",
    phone: "+971 4 367 3333",
    country: "UAE",
    businessType: "Developer",
    estimatedMonthlyVolume: "AED 1,000,000+",
    creditLimit: 1000000,
    creditUsed: 210000,
    paymentTerms: "Net 60",
    status: "active",
    joinedAt: "2025-02-10",
  },
  {
    id: "CUST-003",
    companyName: "Riyadh Builders Co.",
    tradeLicense: "CR-1010234567",
    trn: "",
    contactName: "Khalid Al Subaie",
    email: "khalid@riyadhbuilders.sa",
    password: "customer3",
    phone: "+966 11 234 5678",
    country: "KSA",
    businessType: "Contractor",
    estimatedMonthlyVolume: "AED 100,000–200,000",
    creditLimit: 150000,
    creditUsed: 0,
    paymentTerms: "Net 45",
    status: "pending",
    joinedAt: "2025-03-01",
  },
];

// Module-level singleton (shared across requests within same process)
const registry: Map<string, RegisteredCustomer> = new Map(
  SEEDED.map((c) => [c.email.toLowerCase(), c])
);

export function getCustomer(email: string): RegisteredCustomer | undefined {
  return registry.get(email.toLowerCase());
}

export function addCustomer(customer: RegisteredCustomer): void {
  registry.set(customer.email.toLowerCase(), customer);
}

export function getAllCustomers(): RegisteredCustomer[] {
  return Array.from(registry.values()).sort(
    (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
  );
}

export function updateCustomer(
  email: string,
  updates: Partial<Omit<RegisteredCustomer, "id" | "email">>
): boolean {
  const key = email.toLowerCase();
  const existing = registry.get(key);
  if (!existing) return false;
  registry.set(key, { ...existing, ...updates });
  return true;
}
