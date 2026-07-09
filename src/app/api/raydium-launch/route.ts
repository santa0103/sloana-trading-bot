import { NextRequest, NextResponse } from "next/server";

const launches: Array<{
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  status: "pending" | "created" | "failed";
  txSignature: string | null;
  createdAt: number;
}> = [];

export async function GET() {
  return NextResponse.json({ launches });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, decimals, totalSupply, description } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  const launch = {
    id: Math.random().toString(36).slice(2, 10),
    name,
    symbol,
    decimals: Number(decimals) || 9,
    totalSupply: totalSupply || "1000000000",
    description: description || "",
    status: "pending" as const,
    txSignature: null,
    createdAt: Date.now(),
  };

  launches.push(launch);

  // Simulate token creation after 2s
  setTimeout(() => {
    const idx = launches.findIndex(l => l.id === launch.id);
    if (idx !== -1) {
      launches[idx].status = "created";
      launches[idx].txSignature = Array.from({ length: 64 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[
          Math.floor(Math.random() * 58)
        ]
      ).join("");
    }
  }, 2000);

  return NextResponse.json({ launch }, { status: 201 });
}
