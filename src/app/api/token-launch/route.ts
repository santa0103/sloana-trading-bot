import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

type Launch = {
  id: string;
  name: string;
  symbol: string;
  launchMode: string;
  description: string;
  website: string;
  xUrl: string;
  telegram: string;
  status: "pending" | "launched" | "failed";
  txSignature: string | null;
  createdAt: number;
};

function getStore() { return readStore<Launch[]>("token-launches", []); }
function saveStore(d: Launch[]) { writeStore("token-launches", d); }

export async function GET() {
  return NextResponse.json({ launches: getStore() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, symbol, launchMode, description, website, xUrl, telegram } = body;

  if (!name || !symbol) {
    return NextResponse.json({ error: "name and symbol are required" }, { status: 400 });
  }

  const store = getStore();
  const launch: Launch = {
    id: Math.random().toString(36).slice(2, 10),
    name, symbol,
    launchMode: launchMode || "classic",
    description: description || "",
    website: website || "",
    xUrl: xUrl || "",
    telegram: telegram || "",
    status: "pending",
    txSignature: null,
    createdAt: Date.now(),
  };
  store.push(launch);
  saveStore(store);

  // Simulate async launch — update file after 3s
  setTimeout(() => {
    const current = getStore();
    const idx = current.findIndex(l => l.id === launch.id);
    if (idx !== -1) {
      current[idx].status = "launched";
      current[idx].txSignature = Array.from({ length: 64 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"[Math.floor(Math.random() * 58)]
      ).join("");
      saveStore(current);
    }
  }, 3000);

  return NextResponse.json({ launch }, { status: 201 });
}
