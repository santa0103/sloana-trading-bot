import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

type Bot = {
  id: string;
  tokenAddress: string;
  wallets: number;
  speed: string;
  budget: number;
  status: "running" | "stopped";
  bumpsExecuted: number;
  createdAt: number;
};

function getStore() { return readStore<Bot[]>("bump-bots", []); }
function saveStore(d: Bot[]) { writeStore("bump-bots", d); }

export async function GET() {
  return NextResponse.json({ bots: getStore() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokenAddress, wallets, speed, budget } = body;

  if (!tokenAddress) {
    return NextResponse.json({ error: "tokenAddress is required" }, { status: 400 });
  }

  const store = getStore();
  const bot: Bot = {
    id: Math.random().toString(36).slice(2, 10),
    tokenAddress,
    wallets: Number(wallets) || 10,
    speed: speed || "moderate",
    budget: Number(budget) || 0.5,
    status: "running",
    bumpsExecuted: 0,
    createdAt: Date.now(),
  };
  store.push(bot);
  saveStore(store);
  return NextResponse.json({ bot }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const store = getStore();
  const remaining = store.filter(b => b.id !== id);
  if (remaining.length === store.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  saveStore(remaining);
  return NextResponse.json({ success: true });
}
