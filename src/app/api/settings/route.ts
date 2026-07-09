import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/store";

type Settings = {
  sellSlippage: number;
  buySlippage: number;
  sniperTip: number;
  bundleTip: number;
  terminal: string;
  notifications: boolean;
  newUserMode: boolean;
  theme: string;
};

const DEFAULTS: Settings = {
  sellSlippage: 25,
  buySlippage: 25,
  sniperTip: 0.002,
  bundleTip: 0.002,
  terminal: "axiom",
  notifications: true,
  newUserMode: false,
  theme: "light",
};

function getStore() { return readStore<Settings>("settings", DEFAULTS); }
function saveStore(d: Settings) { writeStore("settings", d); }

export async function GET() {
  return NextResponse.json({ settings: getStore() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const current = getStore();
  const updated = { ...current, ...body };
  saveStore(updated);
  return NextResponse.json({ settings: updated, saved: true });
}
