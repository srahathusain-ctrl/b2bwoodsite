import { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "P001",
    name: "FireGuard FR-18",
    category: "FireGuard (FR)",
    sku: "FG-FR-18-2440",
    thickness: "18mm",
    size: "2440×1220mm",
    price: 420,
    unit: "sheet",
    stock: 1240,
    moq: 50,
    leadDays: 7,
    density: "700 kg/m³",
    fireRating: "Class 1 / BS EN 312",
    certifications: ["BS EN 312", "ASTM E84", "UAE FM"],
    description: "Class 1 fire-rated chipboard, ideal for commercial fit-outs and fire-rated partitions.",
    application: ["Commercial Fit-Out", "Fire-Rated Zone"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50, pricePerUnit: 420, label: "1–199 sheets" },
      { minQty: 200, pricePerUnit: 399, label: "200–499 sheets" },
      { minQty: 500, pricePerUnit: 370, label: "500+ sheets (12% off)" },
    ],
  },
  {
    id: "P002",
    name: "MoistureSeal Plus 15mm",
    category: "MoistureSeal",
    sku: "MS-P-15-2440",
    thickness: "15mm",
    size: "2440×1220mm",
    price: 350,
    unit: "sheet",
    stock: 890,
    moq: 50,
    leadDays: 5,
    density: "720 kg/m³",
    certifications: ["BS EN 312 P5", "ISO 9001"],
    description: "High-density moisture-resistant panel for wet areas, kitchens, and bathrooms.",
    application: ["Wet Area / Kitchen", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50, pricePerUnit: 350, label: "1–199 sheets" },
      { minQty: 200, pricePerUnit: 315, label: "200+ sheets (Buy 200, Get 20 FREE)" },
    ],
  },
  {
    id: "P003",
    name: "Chipboard 18mm FSC",
    category: "Chipboard",
    sku: "CB-18-FSC-2440",
    thickness: "18mm",
    size: "2440×1220mm",
    price: 42,
    unit: "sheet",
    stock: 5200,
    moq: 100,
    leadDays: 3,
    density: "650 kg/m³",
    certifications: ["FSC", "LEED v4", "CARB P2"],
    description: "FSC-certified chipboard for LEED-compliant projects. Meets CARB Phase 2 emissions standards.",
    application: ["LEED Project", "Structural / Flooring", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 100, pricePerUnit: 42, label: "100–499 sheets" },
      { minQty: 500, pricePerUnit: 39, label: "500+ sheets" },
      { minQty: 1000, pricePerUnit: 36, label: "1000+ sheets (full container)" },
    ],
  },
  {
    id: "P004",
    name: "Acoustic Board 12mm",
    category: "Acoustic",
    sku: "AC-12-2440",
    thickness: "12mm",
    size: "2440×1220mm",
    price: 360,
    unit: "sheet",
    stock: 320,
    moq: 20,
    leadDays: 10,
    density: "580 kg/m³",
    certifications: ["ISO 10140", "BS EN ISO 354"],
    description: "Premium acoustic panel achieving NRC 0.85. For studios, hospitality, and offices.",
    application: ["Acoustic Ceiling", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20, pricePerUnit: 360, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 330, label: "100+ sheets (Acoustic + FR-18 bundle −15%)" },
    ],
  },
  {
    id: "P005",
    name: "MDF 16mm Standard",
    category: "MDF",
    sku: "MDF-16-2440",
    thickness: "16mm",
    size: "2440×1220mm",
    price: 120,
    unit: "sheet",
    stock: 3100,
    moq: 50,
    leadDays: 4,
    density: "790 kg/m³",
    certifications: ["BS EN 622-5", "E1 Emission"],
    description: "General-purpose MDF for interior joinery, furniture, and cabinet making.",
    application: ["Residential", "Commercial Fit-Out", "Structural / Flooring"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50, pricePerUnit: 120, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 108, label: "300+ sheets" },
    ],
  },
  {
    id: "P006",
    name: "FireGuard FR-12",
    category: "FireGuard (FR)",
    sku: "FG-FR-12-2440",
    thickness: "12mm",
    size: "2440×1220mm",
    price: 380,
    unit: "sheet",
    stock: 760,
    moq: 50,
    leadDays: 7,
    density: "680 kg/m³",
    fireRating: "Class 1 / BS EN 312",
    certifications: ["BS EN 312", "ASTM E84"],
    description: "Thinner fire-rated option for weight-sensitive applications and suspended ceilings.",
    application: ["Commercial Fit-Out", "Fire-Rated Zone", "Acoustic Ceiling"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50, pricePerUnit: 380, label: "50–499 sheets" },
      { minQty: 500, pricePerUnit: 344, label: "500+ sheets (FR-18 bundle eligible)" },
    ],
  },
  {
    id: "P007",
    name: "Chipboard Non-FR 15mm",
    category: "Chipboard",
    sku: "CB-15-2440",
    thickness: "15mm",
    size: "2440×1220mm",
    price: 38,
    unit: "sheet",
    stock: 300,
    moq: 50,
    leadDays: 3,
    density: "640 kg/m³",
    certifications: ["BS EN 312 P2", "E1 Emission"],
    description: "Standard chipboard for general interior use. End-of-Q1 clearance pricing.",
    application: ["Residential", "Structural / Flooring"],
    tdsAvailable: false,
    volumePricing: [
      { minQty: 50, pricePerUnit: 38, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 31, label: "300 sheets (clearance −18%)" },
    ],
  },
];

export async function getProducts(
  category?: string,
  application?: string,
  search?: string
): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 300));
  let results = [...MOCK_PRODUCTS];

  if (category && category !== "All" && category !== "LEED Certified") {
    results = results.filter((p) => p.category === category);
  }
  if (category === "LEED Certified") {
    results = results.filter((p) => p.certifications.some((c) => c.includes("LEED") || c === "FSC"));
  }
  if (application && application !== "All Applications") {
    results = results.filter((p) => p.application.includes(application));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.certifications.some((c) => c.toLowerCase().includes(q))
    );
  }
  return results;
}

export async function getProduct(id: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

export function getVolumePrice(product: Product, qty: number): number {
  const tiers = [...product.volumePricing].sort((a, b) => b.minQty - a.minQty);
  const tier = tiers.find((t) => qty >= t.minQty);
  return tier ? tier.pricePerUnit : product.price;
}
