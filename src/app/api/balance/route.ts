import { NextRequest, NextResponse } from "next/server";
import { getSolBalance } from "@/lib/solana";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) return NextResponse.json({ error: "address required" }, { status: 400 });

  try {
    const balance = await getSolBalance(address);
    return NextResponse.json({ address, balance, usd: balance * 64 });
  } catch {
    return NextResponse.json({ error: "Invalid address or RPC error" }, { status: 400 });
  }
}
