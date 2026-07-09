import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

type Launch = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  description: string;
  status: "pending" | "created" | "failed";
  txSignature: string | null;
  createdAt: number;
};

function getStore() { return readStore<Launch[]>("raydium-launches", []); }
function saveStore(d: Launch[]) { writeStore("raydium-launches", d); }

export async function GET() {
  return NextResponse.json({ launches: getStore() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, decimals, totalSupply, description } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  const store = getStore();
  const launch: Launch = {
    id: Math.random().toString(36).slice(2, 10),
    name, symbol,
    decimals: Number(decimals) || 9,
    totalSupply: totalSupply || "1000000000",
    description: description || "",
    status: "pending",
    txSignature: null,
    createdAt: Date.now(),
  };
  store.push(launch);
  saveStore(store);

  setTimeout(() => {
    const current = getStore();
    const idx = current.findIndex(l => l.id === launch.id);
    if (idx !== -1) {
      current[idx].status = "created";
      current[idx].txSignature = Array.from({ length: 64 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)]
      ).join("");
      saveStore(current);
    }
  }, 2000);

  return NextResponse.json({ launch }, { status: 201 });
}
