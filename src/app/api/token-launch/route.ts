import { NextRequest, NextResponse } from "next/server";

const launches: Array<{
  id: string;
  name: string;
  symbol: string;
  launchMode: string;
  status: "pending" | "launched" | "failed";
  txSignature: string | null;
  createdAt: number;
}> = [];

export async function GET() {
  return NextResponse.json({ launches });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, launchMode, description, website, xUrl, telegram } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  // In a real implementation this would call Pump.fun SDK
  // For demo, we simulate a successful launch response
  const launch = {
    id: Math.random().toString(36).slice(2, 10),
    name,
    symbol,
    launchMode: launchMode || "classic",
    description: description || "",
    website: website || "",
    xUrl: xUrl || "",
    telegram: telegram || "",
    status: "pending" as const,
    txSignature: null,
    createdAt: Date.now(),
  };

  launches.push(launch);

  // Simulate async launch result
  setTimeout(() => {
    const idx = launches.findIndex(l => l.id === launch.id);
    if (idx !== -1) {
      launches[idx].status = "launched";
      launches[idx].txSignature = Array.from({ length: 64 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[
          Math.floor(Math.random() * 58)
        ]
      ).join("");
    }
  }, 3000);

  return NextResponse.json({ launch }, { status: 201 });
}
