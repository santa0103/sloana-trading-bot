import { NextRequest, NextResponse } from "next/server";
import { Keypair } from "@solana/web3.js";

// In-memory store for demo — replace with DB in production
const walletStore: Array<{ id: string; publicKey: string; label: string; createdAt: number }> = [];

export async function GET() {
  return NextResponse.json({ wallets: walletStore });
}

export async function POST(req: NextRequest) {
  const { action, count = 1, label } = await req.json();

  if (action === "generate") {
    const created = [];
    for (let i = 0; i < Math.min(count, 50); i++) {
      const kp = Keypair.generate();
      const wallet = {
        id: kp.publicKey.toBase58().slice(0, 8),
        publicKey: kp.publicKey.toBase58(),
        label: label || `Wallet ${walletStore.length + i + 1}`,
        createdAt: Date.now(),
      };
      walletStore.push(wallet);
      created.push(wallet);
    }
    return NextResponse.json({ created, total: walletStore.length });
  }

  if (action === "delete") {
    const { ids } = await req.json().catch(() => ({ ids: [] }));
    const before = walletStore.length;
    ids?.forEach((id: string) => {
      const idx = walletStore.findIndex(w => w.id === id);
      if (idx !== -1) walletStore.splice(idx, 1);
    });
    return NextResponse.json({ deleted: before - walletStore.length, total: walletStore.length });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
