import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

type Batch = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  website: string;
  xUrl: string;
  telegram: string;
  discord: string;
  deployCount: number;
  status: "queued" | "running" | "done";
  createdAt: number;
};

function getStore() { return readStore<Batch[]>("spam-batches", []); }
function saveStore(d: Batch[]) { writeStore("spam-batches", d); }

export async function GET() {
  return NextResponse.json({ batches: getStore() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, description, website, xUrl, telegram, discord } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  const store = getStore();
  const batch: Batch = {
    id: Math.random().toString(36).slice(2, 10),
    name, symbol,
    description: description || "",
    website: website || "",
    xUrl: xUrl || "",
    telegram: telegram || "",
    discord: discord || "",
    deployCount: 0,
    status: "queued",
    createdAt: Date.now(),
  };
  store.push(batch);
  saveStore(store);

  setTimeout(() => {
    const current = getStore();
    const idx = current.findIndex(b => b.id === batch.id);
    if (idx !== -1) { current[idx].status = "running"; saveStore(current); }
  }, 1000);

  return NextResponse.json({ batch }, { status: 201 });
}
