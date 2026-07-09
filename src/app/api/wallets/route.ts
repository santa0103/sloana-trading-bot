import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";
import { readStore, writeStore } from "@/lib/store";

type Wallet = { id: string; publicKey: string; label: string; createdAt: number };

function getStore(): Wallet[] {
  return readStore<Wallet[]>("wallets", []);
}

function saveStore(wallets: Wallet[]) {
  writeStore("wallets", wallets);
}

export async function GET() {
  return NextResponse.json({ wallets: getStore() });
}

export async function POST(req: NextRequest) {
  // Parse body ONCE
  const body = await req.json();
  const { action, count = 1, label, ids } = body;

  if (action === "generate") {
    const store = getStore();
    const created: Wallet[] = [];
    const num = Math.min(Number(count), 50);
    for (let i = 0; i < num; i++) {
      const kp = Keypair.generate();
      const wallet: Wallet = {
        id: kp.publicKey.toBase58().slice(0, 8) + Date.now().toString(36),
        publicKey: kp.publicKey.toBase58(),
        label: label || `Wallet ${store.length + i + 1}`,
        createdAt: Date.now(),
      };
      store.push(wallet);
      created.push(wallet);
    }
    saveStore(store);
    return NextResponse.json({ created, total: store.length });
  }

  if (action === "delete") {
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids array required" }, { status: 400 });
    }
    const store = getStore();
    const before = store.length;
    const remaining = store.filter(w => !ids.includes(w.id));
    saveStore(remaining);
    return NextResponse.json({ deleted: before - remaining.length, total: remaining.length });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
