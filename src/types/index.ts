export interface Order {
  id: string;
  product: string;
  category: string;
  qty: string;
  value: number;
  status: string;
  eta: string;
  date: string;
  destination?: string;
  paymentTerm?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  thickness: string;
  size: string;
  price: number;
  unit: string;
  stock: number;
  certifications: string[];
  description?: string;
  image?: string;
  moq: number;
  leadDays: number;
  application: string[];
  volumePricing: VolumePrice[];
  density?: string;
  fireRating?: string;
  tdsAvailable: boolean;
}

export interface VolumePrice {
  minQty: number;
  pricePerUnit: number;
  label: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  vatAmount: number;
  currency: string;
  status: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadedAt: string;
  orderId?: string;
  tags: string[];
}

export interface Offer {
  id: string;
  title: string;
  product: string;
  discount: string;
  minQty: number;
  validUntil: string;
  badge: string;
  description: string;
  savings: number;
}

export interface AnalyticsData {
  revenue: RevenuePoint[];
  productMix: ProductMixPoint[];
  deliveryPerformance: DeliveryPoint[];
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  orders: number;
  target: number;
}

export interface ProductMixPoint {
  name: string;
  value: number;
  color: string;
}

export interface DeliveryPoint {
  month: string;
  onTime: number;
  delayed: number;
}

export interface Notification {
  id: number;
  type: string;
  icon: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RFQItem {
  productId: string;
  productName: string;
  sku: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface RFQDraft {
  items: RFQItem[];
  destination: string;
  paymentTerm: string;
  notes: string;
  projectRef: string;
}

export interface CreditAccount {
  limit: number;
  used: number;
  available: number;
  currency: string;
  paymentTerms: string;
  overdueAmount: number;
  nextDueDate: string;
}

export interface EcoMilesAccount {
  balance: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  pointsToNextTier: number;
  nextTier: string;
  ytdEarned: number;
  redeemableValue: number;
  history: EcoMilesEntry[];
}

export interface EcoMilesEntry {
  date: string;
  description: string;
  points: number;
  orderId?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  country: string;
  contactName: string;
  contactPhone: string;
  isDefault: boolean;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}
