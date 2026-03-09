import { NextRequest, NextResponse } from "next/server";
import { getAllCustomers, updateCustomer } from "@/lib/registered-customers";

export async function GET() {
  const customers = getAllCustomers();
  return NextResponse.json(customers);
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
