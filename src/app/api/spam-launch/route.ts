import { NextRequest, NextResponse } from "next/server";

const batches: Array<{
  id: string;
  name: string;
  symbol: string;
  deployCount: number;
  status: "queued" | "running" | "done";
  createdAt: number;
}> = [];

export async function GET() {
  return NextResponse.json({ batches });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, description, website, xUrl, telegram, discord } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  const batch = {
    id: Math.random().toString(36).slice(2, 10),
    name,
    symbol,
    description: description || "",
    website: website || "",
    xUrl: xUrl || "",
    telegram: telegram || "",
    discord: discord || "",
    deployCount: 0,
    status: "queued" as const,
    createdAt: Date.now(),
  };

  batches.push(batch);

  // Simulate batch starting
  setTimeout(() => {
    const idx = batches.findIndex(b => b.id === batch.id);
    if (idx !== -1) batches[idx].status = "running";
  }, 1000);

  return NextResponse.json({ batch }, { status: 201 });
}
