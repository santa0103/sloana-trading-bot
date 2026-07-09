import { NextRequest, NextResponse } from "next/server";

// In-memory bot store for demo
const bots: Array<{
  id: string;
  tokenAddress: string;
  wallets: number;
  speed: string;
  budget: number;
  status: "running" | "stopped";
  bumpsExecuted: number;
  createdAt: number;
}> = [];

export async function GET() {
  return NextResponse.json({ bots });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokenAddress, wallets, speed, budget } = body;

  if (!tokenAddress) {
    return NextResponse.json({ error: "tokenAddress is required" }, { status: 400 });
  }

  const bot = {
    id: Math.random().toString(36).slice(2, 10),
    tokenAddress,
    wallets: Number(wallets) || 10,
    speed: speed || "moderate",
    budget: Number(budget) || 0.5,
    status: "running" as const,
    bumpsExecuted: 0,
    createdAt: Date.now(),
  };

  bots.push(bot);
  return NextResponse.json({ bot }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const idx = bots.findIndex(b => b.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  bots.splice(idx, 1);
  return NextResponse.json({ success: true });
}
