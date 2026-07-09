import { NextResponse } from "next/server";

export async function GET() {
  try {
    // SOL/USDC price from Jupiter
    const SOL_MINT = "So11111111111111111111111111111111111111112";
    const res = await fetch(
      `https://api.jup.ag/price/v2?ids=${SOL_MINT}`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) throw new Error("Jupiter error");
    const data = await res.json();
    const price = data.data?.[SOL_MINT]?.price ?? 64;
    return NextResponse.json({ price, updatedAt: Date.now() });
  } catch {
    return NextResponse.json({ price: 64, updatedAt: Date.now(), source: "fallback" });
  }
}
