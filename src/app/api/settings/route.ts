import { NextRequest, NextResponse } from "next/server";

// In-memory settings store — replace with DB/cookie in production
let settings = {
  sellSlippage: 25,
  buySlippage: 25,
  sniperTip: 0.002,
  bundleTip: 0.002,
  terminal: "axiom",
  notifications: true,
  newUserMode: false,
  theme: "light",
};

export async function GET() {
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  settings = { ...settings, ...body };
  return NextResponse.json({ settings, saved: true });
}
