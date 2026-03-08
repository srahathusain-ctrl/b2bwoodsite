import { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  // ─── Category 1: Raw & Core Panels ───────────────────────────────────────
  {
    id: "BD-PB-001", name: "15mm Raw Chipboard P2 FSC", category: "Raw Panels",
    sku: "BD-PB-001", thickness: "15mm", size: "2440×1220mm", price: 32, unit: "sheet",
    stock: 4200, moq: 50, leadDays: 3, density: "640 kg/m³",
    certifications: ["FSC Mix", "BS EN 312 P2", "E1 Emission"],
    description: "Standard grade chipboard for interior use (furniture, fit-out). Class E1 emissions.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 32, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 28, label: "300+ sheets" },
    ],
  },
  {
    id: "BD-PB-002", name: "18mm Raw Chipboard P2 FSC", category: "Raw Panels",
    sku: "BD-PB-002", thickness: "18mm", size: "2440×1220mm", price: 38, unit: "sheet",
    stock: 5200, moq: 50, leadDays: 3, density: "650 kg/m³",
    certifications: ["FSC Mix", "BS EN 312 P2", "E1 Emission"],
    description: "Standard grade chipboard for interior use. Size: 2440×1220mm. Class E1 emissions.",
    application: ["Residential", "Commercial Fit-Out", "LEED Project"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 38, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 34, label: "300+ sheets" },
      { minQty: 1000, pricePerUnit: 30, label: "1000+ sheets" },
    ],
  },
  {
    id: "BD-PB-003", name: "25mm Raw Chipboard P2 FSC", category: "Raw Panels",
    sku: "BD-PB-003", thickness: "25mm", size: "2440×1220mm", price: 52, unit: "sheet",
    stock: 1800, moq: 50, leadDays: 4, density: "660 kg/m³",
    certifications: ["FSC Mix", "BS EN 312 P2"],
    description: "Thicker panel for shelving and heavy-duty furniture.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 52, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 46, label: "300+ sheets" },
    ],
  },
  {
    id: "BD-PB-004", name: "18mm MR Chipboard P5 FSC", category: "Raw Panels",
    sku: "BD-PB-004", thickness: "18mm", size: "2440×1220mm", price: 58, unit: "sheet",
    stock: 2100, moq: 50, leadDays: 4, density: "680 kg/m³",
    certifications: ["FSC Mix", "BS EN 312 P5", "ISO 9001"],
    description: "Moisture-resistant grade for kitchens and bathrooms.",
    application: ["Wet Area / Kitchen", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 58, label: "50–199 sheets" },
      { minQty: 200, pricePerUnit: 52, label: "200+ sheets" },
    ],
  },
  {
    id: "BD-PB-005", name: "22mm MR Chipboard P5 FSC", category: "Raw Panels",
    sku: "BD-PB-005", thickness: "22mm", size: "2440×1220mm", price: 68, unit: "sheet",
    stock: 1200, moq: 50, leadDays: 4, density: "680 kg/m³",
    certifications: ["FSC Mix", "BS EN 312 P5"],
    description: "Moisture-resistant grade for humid environments.",
    application: ["Wet Area / Kitchen", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 68, label: "50–199 sheets" },
      { minQty: 200, pricePerUnit: 60, label: "200+ sheets" },
    ],
  },
  {
    id: "BD-PB-006", name: "18mm FR Chipboard P2 FSC", category: "Raw Panels",
    sku: "BD-PB-006", thickness: "18mm", size: "2440×1220mm", price: 420, unit: "sheet",
    stock: 1240, moq: 50, leadDays: 7, density: "700 kg/m³",
    fireRating: "Class 1 / BS EN 312",
    certifications: ["FSC Mix", "BS EN 312", "ASTM E84", "UAE FM"],
    description: "Fire-retardant treated panel for commercial applications.",
    application: ["Commercial Fit-Out", "Fire-Rated Zone"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 420, label: "1–199 sheets" },
      { minQty: 200, pricePerUnit: 399, label: "200–499 sheets" },
      { minQty: 500, pricePerUnit: 370, label: "500+ sheets (12% off)" },
    ],
  },
  {
    id: "BD-PB-007", name: "18mm High Recycled Content Chipboard", category: "Raw Panels",
    sku: "BD-PB-007", thickness: "18mm", size: "2440×1220mm", price: 42, unit: "sheet",
    stock: 3000, moq: 100, leadDays: 3, density: "650 kg/m³",
    certifications: ["FSC Recycled", "LEED v4", "CARB P2"],
    description: "Made from ~80% recycled wood. Ideal for green building projects.",
    application: ["LEED Project", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 100,  pricePerUnit: 42, label: "100–499 sheets" },
      { minQty: 500,  pricePerUnit: 39, label: "500+ sheets" },
      { minQty: 1000, pricePerUnit: 36, label: "1000+ sheets (full container)" },
    ],
  },
  {
    id: "BD-PB-008", name: "18mm T&G Flooring Grade P5 FSC", category: "Raw Panels",
    sku: "BD-PB-008", thickness: "18mm", size: "2400×600mm", price: 48, unit: "sheet",
    stock: 1500, moq: 50, leadDays: 5,
    certifications: ["FSC Mix", "BS EN 312 P5"],
    description: "Tongue and groove chipboard for structural flooring. Max joist spacing 450mm.",
    application: ["Structural / Flooring", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 48, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 43, label: "300+ sheets" },
    ],
  },
  {
    id: "BD-PB-009", name: "22mm T&G Flooring Grade P5 FSC", category: "Raw Panels",
    sku: "BD-PB-009", thickness: "22mm", size: "2400×600mm", price: 58, unit: "sheet",
    stock: 900, moq: 50, leadDays: 5,
    certifications: ["FSC Mix", "BS EN 312 P5"],
    description: "Heavy-duty tongue and groove flooring panel.",
    application: ["Structural / Flooring", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 58, label: "50–299 sheets" },
      { minQty: 300, pricePerUnit: 52, label: "300+ sheets" },
    ],
  },

  // ─── Category 2: Decorative & Finished Panels (MFC) ─────────────────────
  {
    id: "BD-MFC-001", name: "18mm MFC White Matt", category: "MFC Panels",
    sku: "BD-MFC-001", thickness: "18mm", size: "2800×2070mm", price: 95, unit: "sheet",
    stock: 2800, moq: 20, leadDays: 5,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "Standard MFC, white matt finish. Two-sided. For furniture and joinery.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 95, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 85, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-MFC-002", name: "18mm MFC Light Oak", category: "MFC Panels",
    sku: "BD-MFC-002", thickness: "18mm", size: "2800×2070mm", price: 105, unit: "sheet",
    stock: 1600, moq: 20, leadDays: 5,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "Woodgrain MFC for furniture and joinery.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 105, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 94, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-MFC-003", name: "18mm MFC Concrete Grey", category: "MFC Panels",
    sku: "BD-MFC-003", thickness: "18mm", size: "2800×2070mm", price: 105, unit: "sheet",
    stock: 1200, moq: 20, leadDays: 5,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "Textured finish for modern interiors.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 105, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 94, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-MFC-004", name: "18mm MFC Matt Black", category: "MFC Panels",
    sku: "BD-MFC-004", thickness: "18mm", size: "2800×2070mm", price: 110, unit: "sheet",
    stock: 800, moq: 20, leadDays: 5,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "High-fashion colour for statement pieces.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 110, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 99, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-MFC-005", name: "18mm MFC Soft Touch", category: "MFC Panels",
    sku: "BD-MFC-005", thickness: "18mm", size: "2800×2070mm", price: 125, unit: "sheet",
    stock: 600, moq: 20, leadDays: 7,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "Anti-fingerprint, ultra-matt surface for high-end kitchen cabinets.",
    application: ["Wet Area / Kitchen", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 125, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 112, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-MFC-006", name: "18mm MFC Super Matt", category: "MFC Panels",
    sku: "BD-MFC-006", thickness: "18mm", size: "2800×2070mm", price: 120, unit: "sheet",
    stock: 700, moq: 20, leadDays: 7,
    certifications: ["FSC Mix", "E1 Emission"],
    description: "High-gloss alternative for contemporary furniture.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 120, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 108, label: "100+ sheets" },
    ],
  },

  // ─── Category 3: Specialist & Performance Panels ─────────────────────────
  {
    id: "BD-EG-001", name: "Acoustic Flooring Panel 18mm", category: "Acoustic",
    sku: "BD-EG-001", thickness: "18mm", size: "2400×600mm", price: 360, unit: "sheet",
    stock: 320, moq: 20, leadDays: 10,
    certifications: ["FSC Mix", "ISO 10140", "BS EN ISO 354"],
    description: "Chipboard bonded with acoustic matting. Achieves ~20dB sound reduction.",
    application: ["Acoustic Ceiling", "Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 360, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 330, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-EG-002", name: "Acoustic Flooring Panel 22mm", category: "Acoustic",
    sku: "BD-EG-002", thickness: "22mm", size: "2400×600mm", price: 420, unit: "sheet",
    stock: 200, moq: 20, leadDays: 10,
    certifications: ["FSC Mix", "ISO 10140"],
    description: "Heavy-duty acoustic flooring for enhanced sound insulation.",
    application: ["Acoustic Ceiling", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 420, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 385, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-EG-003", name: "UFH Chipboard Board 18mm", category: "Specialist",
    sku: "BD-EG-003", thickness: "18mm", size: "2400×600mm", price: 155, unit: "sheet",
    stock: 400, moq: 20, leadDays: 7,
    certifications: ["FSC Mix"],
    description: "Routed panels for underfloor heating pipes, foil-faced.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 155, label: "20–99 sheets" },
      { minQty: 100, pricePerUnit: 140, label: "100+ sheets" },
    ],
  },
  {
    id: "BD-EG-004", name: "Exterior Grade Plywood 18mm", category: "Specialist",
    sku: "BD-EG-004", thickness: "18mm", size: "2440×1220mm", price: 185, unit: "sheet",
    stock: 650, moq: 25, leadDays: 5,
    certifications: ["FSC 100%", "WBP"],
    description: "WBP (weather and boil proof) plywood for outdoor use.",
    application: ["Commercial Fit-Out", "Structural / Flooring"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 25,  pricePerUnit: 185, label: "25–99 sheets" },
      { minQty: 100, pricePerUnit: 168, label: "100+ sheets" },
    ],
  },

  // ─── Category 4: Softwoods ────────────────────────────────────────────────
  {
    id: "SW-SW-001", name: "Kiln Dried Radiata Pine 47×100mm", category: "Softwood",
    sku: "SW-SW-001", thickness: "47mm", size: "47×100mm × 3.0m", price: 28, unit: "length",
    stock: 3500, moq: 50, leadDays: 3,
    certifications: ["FSC Mix"],
    description: "Structural timber for framing. Planed all round (PAR). Length: 3.0m.",
    application: ["Structural / Flooring", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 28, label: "50–299 lengths" },
      { minQty: 300, pricePerUnit: 24, label: "300+ lengths" },
    ],
  },
  {
    id: "SW-SW-002", name: "Kiln Dried Radiata Pine 47×150mm", category: "Softwood",
    sku: "SW-SW-002", thickness: "47mm", size: "47×150mm × 4.8m", price: 52, unit: "length",
    stock: 2200, moq: 50, leadDays: 3,
    certifications: ["FSC Mix"],
    description: "Structural timber for joists and rafters. Length: 4.8m.",
    application: ["Structural / Flooring", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 52, label: "50–199 lengths" },
      { minQty: 200, pricePerUnit: 46, label: "200+ lengths" },
    ],
  },
  {
    id: "SW-SW-003", name: "Kiln Dried Radiata Pine 19×94mm", category: "Softwood",
    sku: "SW-SW-003", thickness: "19mm", size: "19×94mm × 2.4m", price: 18, unit: "length",
    stock: 4000, moq: 100, leadDays: 3,
    certifications: ["FSC Mix"],
    description: "Planed timber for battens and furring. Length: 2.4m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 100, pricePerUnit: 18, label: "100–499 lengths" },
      { minQty: 500, pricePerUnit: 15, label: "500+ lengths" },
    ],
  },
  {
    id: "SW-SW-004", name: "SPF Structural Timber 38×140mm", category: "Softwood",
    sku: "SW-SW-004", thickness: "38mm", size: "38×140mm × 3.66m", price: 58, unit: "length",
    stock: 1800, moq: 50, leadDays: 4,
    certifications: ["FSC Mix"],
    description: "Dimensionally stable framing timber. Length: 3.66m.",
    application: ["Structural / Flooring", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 58, label: "50–199 lengths" },
      { minQty: 200, pricePerUnit: 52, label: "200+ lengths" },
    ],
  },
  {
    id: "SW-SW-005", name: "Douglas Fir Beam 150×150mm", category: "Softwood",
    sku: "SW-SW-005", thickness: "150mm", size: "150×150mm × 4.0m", price: 420, unit: "length",
    stock: 180, moq: 5, leadDays: 10,
    certifications: ["FSC 100%"],
    description: "Heavy structural beam for post-and-beam construction. Length: 4.0m.",
    application: ["Structural / Flooring", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 420, label: "5–19 lengths" },
      { minQty: 20, pricePerUnit: 385, label: "20+ lengths" },
    ],
  },
  {
    id: "SW-SW-006", name: "Western Red Cedar Cladding 19×120mm", category: "Softwood",
    sku: "SW-SW-006", thickness: "19mm", size: "19×120mm × 3.0–4.2m", price: 145, unit: "length",
    stock: 420, moq: 20, leadDays: 7,
    certifications: ["FSC Mix"],
    description: "Naturally durable, ship-lap/T&G profile. Length: 3.0–4.2m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 145, label: "20–99 lengths" },
      { minQty: 100, pricePerUnit: 130, label: "100+ lengths" },
    ],
  },

  // ─── Category 5: Hardwoods ────────────────────────────────────────────────
  {
    id: "SW-HW-001", name: "European Oak Worktop 40×650mm", category: "Hardwood",
    sku: "SW-HW-001", thickness: "40mm", size: "40×650mm × 3.0m", price: 980, unit: "length",
    stock: 85, moq: 2, leadDays: 10,
    certifications: ["FSC Mix"],
    description: "Solid finger-jointed oak worktop. Oiled finish. Length: 3.0m.",
    application: ["Wet Area / Kitchen", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 2,  pricePerUnit: 980, label: "2–9 lengths" },
      { minQty: 10, pricePerUnit: 900, label: "10+ lengths" },
    ],
  },
  {
    id: "SW-HW-002", name: "European Oak Flooring 20×140mm", category: "Hardwood",
    sku: "SW-HW-002", thickness: "20mm", size: "20×140mm × random", price: 185, unit: "m²",
    stock: 350, moq: 10, leadDays: 7,
    certifications: ["FSC Mix"],
    description: "Solid tongue and groove oak flooring. Selected grade. Random lengths 0.3–1.2m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 185, label: "10–49 m²" },
      { minQty: 50,  pricePerUnit: 168, label: "50+ m²" },
    ],
  },
  {
    id: "SW-HW-003", name: "European Ash Board 26×150mm", category: "Hardwood",
    sku: "SW-HW-003", thickness: "26mm", size: "26×150mm × 2.4m", price: 145, unit: "length",
    stock: 220, moq: 10, leadDays: 7,
    certifications: ["FSC Mix"],
    description: "Furniture-grade ash, kiln dried. Planed square edge (PSE). Length: 2.4m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 145, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 130, label: "50+ lengths" },
    ],
  },
  {
    id: "SW-HW-004", name: "Red Grandis Timber 50×50mm", category: "Hardwood",
    sku: "SW-HW-004", thickness: "50mm", size: "50×50mm × 2.4m", price: 88, unit: "length",
    stock: 310, moq: 20, leadDays: 7,
    certifications: ["FSC 100%"],
    description: "Plantation hardwood, sustainable alternative to mahogany. Length: 2.4m.",
    application: ["Residential", "Commercial Fit-Out", "LEED Project"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 88, label: "20–99 lengths" },
      { minQty: 100, pricePerUnit: 79, label: "100+ lengths" },
    ],
  },
  {
    id: "SW-HW-005", name: "Red Grandis Decking 21×145mm", category: "Hardwood",
    sku: "SW-HW-005", thickness: "21mm", size: "21×145mm × 3.0m", price: 165, unit: "length",
    stock: 190, moq: 20, leadDays: 7,
    certifications: ["FSC 100%"],
    description: "Profiled decking board with smooth or grooved finish. Length: 3.0m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 20,  pricePerUnit: 165, label: "20–99 lengths" },
      { minQty: 100, pricePerUnit: 148, label: "100+ lengths" },
    ],
  },
  {
    id: "SW-HW-006", name: "Rubberwood Board 18×100mm", category: "Hardwood",
    sku: "SW-HW-006", thickness: "18mm", size: "18×100mm × 2.4m", price: 55, unit: "length",
    stock: 480, moq: 50, leadDays: 5,
    certifications: ["FSC Mix"],
    description: "Stable hardwood from plantation trees. Ideal for furniture components. Length: 2.4m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 50,  pricePerUnit: 55, label: "50–199 lengths" },
      { minQty: 200, pricePerUnit: 49, label: "200+ lengths" },
    ],
  },
  {
    id: "SW-HW-007", name: "Rubberwood Flooring 15×90mm", category: "Hardwood",
    sku: "SW-HW-007", thickness: "15mm", size: "15×90mm T&G", price: 95, unit: "m²",
    stock: 280, moq: 10, leadDays: 5,
    certifications: ["FSC Mix"],
    description: "Pre-finished solid rubberwood flooring. Tongue and groove.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 95, label: "10–49 m²" },
      { minQty: 50,  pricePerUnit: 85, label: "50+ m²" },
    ],
  },
  {
    id: "SW-HW-008", name: "Canadian Hard Maple Board 25×100mm", category: "Hardwood",
    sku: "SW-HW-008", thickness: "25mm", size: "25×100mm × 2.4m", price: 175, unit: "length",
    stock: 140, moq: 10, leadDays: 10,
    certifications: ["FSC Mix"],
    description: "Hard, wear-resistant timber for worktops and butcher blocks. Length: 2.4m.",
    application: ["Wet Area / Kitchen", "Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 175, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 158, label: "50+ lengths" },
    ],
  },

  // ─── Category 6: Engineered Wood ─────────────────────────────────────────
  {
    id: "SW-EG-001", name: "FSC Oak Engineered Flooring 15/4mm", category: "Engineered Wood",
    sku: "SW-EG-001", thickness: "15mm", size: "1900×190mm planks", price: 210, unit: "m²",
    stock: 420, moq: 10, leadDays: 7,
    certifications: ["FSC Mix", "LEED v4"],
    description: "4mm oak wear layer on plywood base. 1900×190mm planks.",
    application: ["Residential", "Commercial Fit-Out", "LEED Project"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 210, label: "10–49 m²" },
      { minQty: 50,  pricePerUnit: 190, label: "50+ m²" },
    ],
  },
  {
    id: "SW-EG-002", name: "FSC Oak Engineered Skirting 20×240mm", category: "Engineered Wood",
    sku: "SW-EG-002", thickness: "20mm", size: "20×240mm × 2.2m", price: 85, unit: "length",
    stock: 350, moq: 10, leadDays: 7,
    certifications: ["FSC Mix"],
    description: "Band sawn oak skirting to match flooring. Length: 2.2m.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 85, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 76, label: "50+ lengths" },
    ],
  },
  {
    id: "SW-EG-003", name: "FSC Red Grandis Engineered Flooring 15/4mm", category: "Engineered Wood",
    sku: "SW-EG-003", thickness: "15mm", size: "1900×190mm planks", price: 230, unit: "m²",
    stock: 200, moq: 10, leadDays: 10,
    certifications: ["FSC 100%", "LEED v4"],
    description: "4mm Red Grandis wear layer on plywood. Sustainable alternative.",
    application: ["Residential", "Commercial Fit-Out", "LEED Project"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 230, label: "10–49 m²" },
      { minQty: 50,  pricePerUnit: 208, label: "50+ m²" },
    ],
  },
  {
    id: "SW-EG-004", name: "FSC Glulam Beam 200×400mm", category: "Engineered Wood",
    sku: "SW-EG-004", thickness: "200mm", size: "200×400mm, custom length", price: 1850, unit: "m",
    stock: 60, moq: 2, leadDays: 14,
    certifications: ["FSC Mix"],
    description: "Structural glued laminated timber. Custom lengths available.",
    application: ["Structural / Flooring", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 2,  pricePerUnit: 1850, label: "2–9 metres" },
      { minQty: 10, pricePerUnit: 1680, label: "10+ metres" },
    ],
  },
  {
    id: "SW-EG-005", name: "FSC CLT Panel 100mm", category: "Engineered Wood",
    sku: "SW-EG-005", thickness: "100mm", size: "custom", price: 2400, unit: "m²",
    stock: 40, moq: 5, leadDays: 21,
    certifications: ["FSC Mix"],
    description: "Cross-laminated timber panel for structural walls/floors. Made from Radiata Pine.",
    application: ["Structural / Flooring", "Commercial Fit-Out", "LEED Project"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 2400, label: "5–19 m²" },
      { minQty: 20, pricePerUnit: 2200, label: "20+ m²" },
    ],
  },
  {
    id: "SW-EG-006", name: "FSC Finger Jointed Timber 69×240mm", category: "Engineered Wood",
    sku: "SW-EG-006", thickness: "69mm", size: "69×240mm, custom length", price: 185, unit: "m",
    stock: 120, moq: 10, leadDays: 10,
    certifications: ["FSC Mix"],
    description: "Structural finger jointed timber for long, straight lengths.",
    application: ["Structural / Flooring", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 185, label: "10–49 metres" },
      { minQty: 50,  pricePerUnit: 168, label: "50+ metres" },
    ],
  },

  // ─── Category 7: Edge Finishing & Protection ─────────────────────────────
  {
    id: "AC-EDG-001", name: "ABS Edge Banding White Matt 22mm×0.4mm", category: "Accessories",
    sku: "AC-EDG-001", thickness: "0.4mm", size: "22mm × 50m roll", price: 48, unit: "roll",
    stock: 600, moq: 5, leadDays: 2,
    certifications: [],
    description: "50m roll, matching white matt MFC. Heat-activated adhesive.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 48, label: "5–19 rolls" },
      { minQty: 20, pricePerUnit: 42, label: "20+ rolls" },
    ],
  },
  {
    id: "AC-EDG-002", name: "ABS Edge Banding Light Oak 22mm×0.4mm", category: "Accessories",
    sku: "AC-EDG-002", thickness: "0.4mm", size: "22mm × 50m roll", price: 52, unit: "roll",
    stock: 480, moq: 5, leadDays: 2,
    certifications: [],
    description: "50m roll, matching light oak MFC.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 52, label: "5–19 rolls" },
      { minQty: 20, pricePerUnit: 46, label: "20+ rolls" },
    ],
  },
  {
    id: "AC-EDG-003", name: "ABS Edge Banding Concrete Grey 22mm×2.0mm", category: "Accessories",
    sku: "AC-EDG-003", thickness: "2.0mm", size: "22mm × 25m roll", price: 68, unit: "roll",
    stock: 300, moq: 5, leadDays: 2,
    certifications: [],
    description: "25m roll, thick impact-resistant banding.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 68, label: "5–19 rolls" },
      { minQty: 20, pricePerUnit: 61, label: "20+ rolls" },
    ],
  },
  {
    id: "AC-EDG-004", name: "Solid Oak Edge Strip 10×20mm", category: "Accessories",
    sku: "AC-EDG-004", thickness: "10mm", size: "10×20mm × 2.4m", price: 28, unit: "length",
    stock: 450, moq: 10, leadDays: 3,
    certifications: [],
    description: "2.4m length, for edging plywood or solid wood panels.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 28, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 24, label: "50+ lengths" },
    ],
  },
  {
    id: "AC-EDG-005", name: "Aluminium Edge Trim Brushed Silver", category: "Accessories",
    sku: "AC-EDG-005", thickness: "25mm", size: "L-profile 25mm × 2.5m", price: 38, unit: "length",
    stock: 380, moq: 10, leadDays: 3,
    certifications: [],
    description: "L-profile, 25mm × 2.5m, for worktops and shelving.",
    application: ["Commercial Fit-Out", "Residential", "Wet Area / Kitchen"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 38, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 34, label: "50+ lengths" },
    ],
  },
  {
    id: "AC-EDG-006", name: "Brass Edge Trim Satin Brass", category: "Accessories",
    sku: "AC-EDG-006", thickness: "20mm", size: "L-profile 20mm × 2.5m", price: 65, unit: "length",
    stock: 180, moq: 10, leadDays: 5,
    certifications: [],
    description: "L-profile, 20mm × 2.5m, for high-end furniture.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 65, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 58, label: "50+ lengths" },
    ],
  },

  // ─── Category 8: Moisture & Air Sealing ──────────────────────────────────
  {
    id: "AC-SEA-001", name: "Sanitary Silicone White", category: "Accessories",
    sku: "AC-SEA-001", thickness: "—", size: "310ml cartridge", price: 18, unit: "cartridge",
    stock: 800, moq: 12, leadDays: 2,
    certifications: [],
    description: "Anti-mould, 310ml cartridge. For kitchen/bathroom sealing.",
    application: ["Wet Area / Kitchen", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 12,  pricePerUnit: 18, label: "12–59 units" },
      { minQty: 60,  pricePerUnit: 15, label: "60+ units" },
    ],
  },
  {
    id: "AC-SEA-002", name: "Sanitary Silicone Clear", category: "Accessories",
    sku: "AC-SEA-002", thickness: "—", size: "310ml cartridge", price: 18, unit: "cartridge",
    stock: 750, moq: 12, leadDays: 2,
    certifications: [],
    description: "Anti-mould, clear finish, 310ml cartridge.",
    application: ["Wet Area / Kitchen", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 12,  pricePerUnit: 18, label: "12–59 units" },
      { minQty: 60,  pricePerUnit: 15, label: "60+ units" },
    ],
  },
  {
    id: "AC-SEA-003", name: "Neutral Cure Silicone Translucent", category: "Accessories",
    sku: "AC-SEA-003", thickness: "—", size: "310ml cartridge", price: 22, unit: "cartridge",
    stock: 500, moq: 12, leadDays: 2,
    certifications: [],
    description: "Odourless, for sensitive materials. 310ml cartridge.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 12,  pricePerUnit: 22, label: "12–59 units" },
      { minQty: 60,  pricePerUnit: 19, label: "60+ units" },
    ],
  },
  {
    id: "AC-SEA-004", name: "Flexible Foam Sealant Tape 15×3mm", category: "Accessories",
    sku: "AC-SEA-004", thickness: "3mm", size: "15mm × 6m roll", price: 24, unit: "roll",
    stock: 420, moq: 10, leadDays: 2,
    certifications: [],
    description: "Pre-compressed, for window/door frames. 6m roll.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 24, label: "10–49 rolls" },
      { minQty: 50,  pricePerUnit: 21, label: "50+ rolls" },
    ],
  },
  {
    id: "AC-SEA-005", name: "Intumescent Acoustic Seal 15×4mm", category: "Accessories",
    sku: "AC-SEA-005", thickness: "4mm", size: "15mm × 2.1m length", price: 38, unit: "length",
    stock: 320, moq: 10, leadDays: 3,
    certifications: [],
    description: "Fire and smoke seal for FD30/FD60 doors. 2.1m length.",
    fireRating: "FD30 / FD60",
    application: ["Fire-Rated Zone", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 38, label: "10–49 lengths" },
      { minQty: 50,  pricePerUnit: 34, label: "50+ lengths" },
    ],
  },
  {
    id: "AC-SEA-006", name: "EPDM Weatherstrip Pile Type", category: "Accessories",
    sku: "AC-SEA-006", thickness: "—", size: "self-adhesive × 10m roll", price: 32, unit: "roll",
    stock: 280, moq: 10, leadDays: 2,
    certifications: [],
    description: "Self-adhesive, for sealing door/perimeter gaps. 10m roll.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 10,  pricePerUnit: 32, label: "10–49 rolls" },
      { minQty: 50,  pricePerUnit: 28, label: "50+ rolls" },
    ],
  },

  // ─── Category 9: Gaskets & Performance Seals ─────────────────────────────
  {
    id: "AC-GAS-001", name: "Automatic Drop-Door Seal 1000mm", category: "Accessories",
    sku: "AC-GAS-001", thickness: "—", size: "1000mm length", price: 185, unit: "unit",
    stock: 90, moq: 2, leadDays: 5,
    certifications: [],
    description: "Mortice or surface-mounted acoustic seal. Aluminium/brush.",
    application: ["Fire-Rated Zone", "Acoustic Ceiling", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 2,  pricePerUnit: 185, label: "2–9 units" },
      { minQty: 10, pricePerUnit: 168, label: "10+ units" },
    ],
  },
  {
    id: "AC-GAS-002", name: "Perimeter Gasket D-Profile", category: "Accessories",
    sku: "AC-GAS-002", thickness: "—", size: "self-adhesive × 10m roll", price: 28, unit: "roll",
    stock: 250, moq: 5, leadDays: 2,
    certifications: [],
    description: "Self-adhesive rubber gasket for door frames. 10m roll.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 28, label: "5–19 rolls" },
      { minQty: 20, pricePerUnit: 24, label: "20+ rolls" },
    ],
  },
  {
    id: "AC-GAS-003", name: "Neoprene Gasket Sponge 6mm", category: "Accessories",
    sku: "AC-GAS-003", thickness: "6mm", size: "6mm thick × 5m roll", price: 35, unit: "roll",
    stock: 180, moq: 5, leadDays: 3,
    certifications: [],
    description: "6mm thick, for sealing panels in frames. 5m roll.",
    application: ["Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 35, label: "5–19 rolls" },
      { minQty: 20, pricePerUnit: 31, label: "20+ rolls" },
    ],
  },
  {
    id: "AC-GAS-004", name: "Acoustic Seal Kit for Partitions", category: "Accessories",
    sku: "AC-GAS-004", thickness: "—", size: "complete kit", price: 145, unit: "kit",
    stock: 75, moq: 2, leadDays: 4,
    certifications: [],
    description: "Complete kit for timber stud partitions.",
    application: ["Acoustic Ceiling", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 2,  pricePerUnit: 145, label: "2–9 kits" },
      { minQty: 10, pricePerUnit: 130, label: "10+ kits" },
    ],
  },

  // ─── Category 10: Fixings & Adhesives ────────────────────────────────────
  {
    id: "AC-FIX-001", name: "Confirmat Screws 7×50mm", category: "Accessories",
    sku: "AC-FIX-001", thickness: "—", size: "box of 200", price: 28, unit: "box",
    stock: 500, moq: 5, leadDays: 2,
    certifications: [],
    description: "Zinc-plated, for chipboard connection. Box of 200.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 28, label: "5–19 boxes" },
      { minQty: 20, pricePerUnit: 24, label: "20+ boxes" },
    ],
  },
  {
    id: "AC-FIX-002", name: "Confirmat Screws 7×70mm", category: "Accessories",
    sku: "AC-FIX-002", thickness: "—", size: "box of 200", price: 32, unit: "box",
    stock: 420, moq: 5, leadDays: 2,
    certifications: [],
    description: "Extra length for thicker panels. Box of 200.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 32, label: "5–19 boxes" },
      { minQty: 20, pricePerUnit: 28, label: "20+ boxes" },
    ],
  },
  {
    id: "AC-FIX-003", name: "Shelf Pins Nickel Plated", category: "Accessories",
    sku: "AC-FIX-003", thickness: "—", size: "pack of 100", price: 22, unit: "pack",
    stock: 380, moq: 5, leadDays: 2,
    certifications: [],
    description: "With nylon bushings. Pack of 100.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 22, label: "5–19 packs" },
      { minQty: 20, pricePerUnit: 19, label: "20+ packs" },
    ],
  },
  {
    id: "AC-FIX-004", name: "Cam Lock & Dowel Set 15mm", category: "Accessories",
    sku: "AC-FIX-004", thickness: "—", size: "pack of 50 sets", price: 38, unit: "pack",
    stock: 300, moq: 5, leadDays: 2,
    certifications: [],
    description: "15mm system, for KD furniture assembly. Pack of 50 sets.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 38, label: "5–19 packs" },
      { minQty: 20, pricePerUnit: 34, label: "20+ packs" },
    ],
  },
  {
    id: "AC-FIX-005", name: "Soft-Close Hinge Clip-On 110°", category: "Accessories",
    sku: "AC-FIX-005", thickness: "—", size: "pack of 10", price: 65, unit: "pack",
    stock: 250, moq: 5, leadDays: 3,
    certifications: [],
    description: "110° opening, face-frameless. Pack of 10.",
    application: ["Residential", "Commercial Fit-Out", "Wet Area / Kitchen"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 65, label: "5–19 packs" },
      { minQty: 20, pricePerUnit: 58, label: "20+ packs" },
    ],
  },
  {
    id: "AC-FIX-006", name: "Soft-Close Drawer Runner 450mm", category: "Accessories",
    sku: "AC-FIX-006", thickness: "—", size: "pair, 450mm, 30kg", price: 88, unit: "pair",
    stock: 180, moq: 5, leadDays: 3,
    certifications: [],
    description: "Full extension, 30kg capacity. Pair.",
    application: ["Residential", "Commercial Fit-Out", "Wet Area / Kitchen"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 5,  pricePerUnit: 88, label: "5–19 pairs" },
      { minQty: 20, pricePerUnit: 79, label: "20+ pairs" },
    ],
  },
  {
    id: "AC-ADH-001", name: "PVA Wood Glue D3 5L", category: "Accessories",
    sku: "AC-ADH-001", thickness: "—", size: "5 litre", price: 95, unit: "tub",
    stock: 200, moq: 4, leadDays: 2,
    certifications: [],
    description: "Professional grade, interior use. 5 litre.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 4,  pricePerUnit: 95, label: "4–11 tubs" },
      { minQty: 12, pricePerUnit: 85, label: "12+ tubs" },
    ],
  },
  {
    id: "AC-ADH-002", name: "PVA Wood Glue D4 5L", category: "Accessories",
    sku: "AC-ADH-002", thickness: "—", size: "5 litre", price: 115, unit: "tub",
    stock: 160, moq: 4, leadDays: 2,
    certifications: [],
    description: "Waterproof grade, exterior use. 5 litre.",
    application: ["Commercial Fit-Out", "Structural / Flooring"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 4,  pricePerUnit: 115, label: "4–11 tubs" },
      { minQty: 12, pricePerUnit: 102, label: "12+ tubs" },
    ],
  },
  {
    id: "AC-ADH-003", name: "Contact Adhesive Solvent Free 1L", category: "Accessories",
    sku: "AC-ADH-003", thickness: "—", size: "1 litre", price: 48, unit: "tin",
    stock: 280, moq: 6, leadDays: 2,
    certifications: [],
    description: "For laminates and edge banding. 1 litre.",
    application: ["Residential", "Commercial Fit-Out"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 6,  pricePerUnit: 48, label: "6–23 tins" },
      { minQty: 24, pricePerUnit: 42, label: "24+ tins" },
    ],
  },
  {
    id: "AC-ADH-004", name: "Construction Adhesive Heavy Duty 290ml", category: "Accessories",
    sku: "AC-ADH-004", thickness: "—", size: "290ml cartridge", price: 22, unit: "cartridge",
    stock: 350, moq: 12, leadDays: 2,
    certifications: [],
    description: "For bonding timber to masonry. 290ml cartridge.",
    application: ["Structural / Flooring", "Commercial Fit-Out", "Residential"],
    tdsAvailable: true,
    volumePricing: [
      { minQty: 12,  pricePerUnit: 22, label: "12–59 units" },
      { minQty: 60,  pricePerUnit: 19, label: "60+ units" },
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
    results = results.filter((p) => p.certifications.some((c) => c.includes("LEED") || c.includes("FSC")));
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
        p.fireRating?.toLowerCase().includes(q) ||
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
