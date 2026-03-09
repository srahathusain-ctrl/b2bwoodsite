import { NextRequest, NextResponse } from "next/server";
import { getAllCustomers, updateCustomer, addCustomer, getCustomer, RegisteredCustomer } from "@/lib/registered-customers";

export async function GET() {
  const customers = getAllCustomers();
  return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName, tradeLicense, trn, contactName,
      email, password, phone, country, businessType,
      creditLimit, paymentTerms, status,
    } = body;

    if (!email || !password || !companyName || !contactName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (getCustomer(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const newCustomer: RegisteredCustomer = {
      id: `CUST-${Date.now()}`,
      companyName,
      tradeLicense: tradeLicense || "",
      trn: trn || "",
      contactName,
      email: email.toLowerCase(),
      password,
      phone: phone || "",
      country: country || "UAE",
      businessType: businessType || "Other",
      estimatedMonthlyVolume: "Not specified",
      creditLimit: parseFloat(creditLimit) || 0,
      creditUsed: 0,
      paymentTerms: paymentTerms || "Net 30",
      status: status || "active",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    addCustomer(newCustomer);
    return NextResponse.json({ success: true, customerId: newCustomer.id });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { email, updates } = await req.json();
    if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
    const ok = updateCustomer(email, updates);
    if (!ok) return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
