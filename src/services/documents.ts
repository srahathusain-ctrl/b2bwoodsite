import { Document } from "@/types";

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "D001",
    name: "FireGuard FR-18 Technical Submittal",
    type: "PDF",
    category: "Technical",
    size: "2.4 MB",
    uploadedAt: "2025-03-10",
    orderId: "SW-2024-0892",
    tags: ["fire-rated", "submittal", "FR-18"],
  },
  {
    id: "D002",
    name: "INV-2025-0341 Tax Invoice",
    type: "PDF",
    category: "Invoice",
    size: "156 KB",
    uploadedAt: "2025-03-01",
    orderId: "SW-2024-0892",
    tags: ["invoice", "tax", "2025"],
  },
  {
    id: "D003",
    name: "FSC Chain of Custody Certificate",
    type: "PDF",
    category: "Certification",
    size: "890 KB",
    uploadedAt: "2025-02-15",
    tags: ["FSC", "certification", "LEED"],
  },
  {
    id: "D004",
    name: "LEED v4 Material Credits Report",
    type: "PDF",
    category: "LEED",
    size: "3.1 MB",
    uploadedAt: "2025-02-10",
    tags: ["LEED", "sustainability", "credits"],
  },
  {
    id: "D005",
    name: "Delivery Order DO-892",
    type: "PDF",
    category: "Logistics",
    size: "120 KB",
    uploadedAt: "2025-03-12",
    orderId: "SW-2024-0892",
    tags: ["delivery", "logistics", "DO"],
  },
  {
    id: "D006",
    name: "MoistureSeal Technical Data Sheet",
    type: "PDF",
    category: "Technical",
    size: "1.8 MB",
    uploadedAt: "2025-01-20",
    tags: ["moisture-resistant", "technical", "TDS"],
  },
];

export async function getDocuments(category?: string): Promise<Document[]> {
  await new Promise((r) => setTimeout(r, 300));
  if (category && category !== "All") {
    return MOCK_DOCUMENTS.filter((d) => d.category === category);
  }
  return MOCK_DOCUMENTS;
}
