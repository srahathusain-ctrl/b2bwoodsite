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
    certifications: ["BS EN 312", "ASTM E84", "UAE FM"],
    description: "Class 1 fire-rated chipboard, ideal for commercial fit-outs.",
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
    certifications: ["BS EN 312 P5", "ISO 9001"],
    description: "High-density moisture-resistant panel for wet areas.",
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
    certifications: ["FSC", "LEED v4", "CARB P2"],
    description: "FSC-certified chipboard for LEED-compliant projects.",
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
    certifications: ["ISO 10140", "BS EN ISO 354"],
    description: "Premium acoustic panel for sound-sensitive environments.",
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
    certifications: ["BS EN 622-5", "E1 Emission"],
    description: "General-purpose MDF for interior joinery and furniture.",
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
    certifications: ["BS EN 312", "ASTM E84"],
    description: "Thinner fire-rated option for weight-sensitive applications.",
  },
];

export async function getProducts(category?: string): Promise<Product[]> {
  await new Promise((r) => setTimeout(r, 300));
  if (category && category !== "All") {
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  }
  return MOCK_PRODUCTS;
}

export async function getProduct(id: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}
