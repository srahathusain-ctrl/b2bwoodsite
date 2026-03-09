import { NextRequest, NextResponse } from "next/server";
import { addCustomer, getCustomer, RegisteredCustomer } from "@/lib/registered-customers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName, tradeLicense, trn, contactName,
      email, password, phone, country, businessType, estimatedMonthlyVolume,
    } = body;

    if (!email || !password || !companyName || !contactName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = getCustomer(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const newCustomer: RegisteredCustomer = {
      id: `CUST-${Date.now()}`,
      companyName,
      tradeLicense: tradeLicense || "",
      trn: trn || "",
      contactName,
      email: email.toLowerCase(),
      password, // plain-text for demo; hash in production
      phone: phone || "",
      country: country || "UAE",
      businessType: businessType || "Other",
      estimatedMonthlyVolume: estimatedMonthlyVolume || "Not specified",
      creditLimit: 0,
      creditUsed: 0,
      paymentTerms: "Net 30",
      status: "active",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    addCustomer(newCustomer);

    return NextResponse.json({ success: true, customerId: newCustomer.id });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
