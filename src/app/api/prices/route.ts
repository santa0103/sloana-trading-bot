import { NextResponse } from "next/server";

// Solana mainnet mint addresses for tokens we display
const MINT_MAP: Record<string, string> = {
  WIF:  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  SOL:  "So11111111111111111111111111111111111111112",
};

export async function GET() {
  try {
    const ids = Object.values(MINT_MAP).join(",");
    const res = await fetch(`https://api.jup.ag/price/v2?ids=${ids}`, {
      next: { revalidate: 8 },
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) throw new Error(`Jupiter ${res.status}`);
    const data = await res.json();

    const prices: Record<string, number> = {};
    for (const [symbol, mint] of Object.entries(MINT_MAP)) {
      prices[symbol] = Number(data.data?.[mint]?.price ?? 0);
    }

    return NextResponse.json({ prices, updatedAt: Date.now(), source: "jupiter" });
  } catch (err) {
    console.error("Price fetch error:", err);
    return NextResponse.json({
      prices: { WIF: 1.02, BONK: 0.000021, USDC: 1.0, SOL: 64.0 },
      updatedAt: Date.now(),
      source: "fallback",
    });
  }
}
