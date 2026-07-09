// Shared fetch helpers for API routes

export async function fetchSolPrice(): Promise<number> {
  const res = await fetch("/api/sol-price");
  if (!res.ok) return 64;
  const data = await res.json();
  return data.price;
}

export async function fetchBalance(address: string): Promise<{ balance: number; usd: number }> {
  const res = await fetch(`/api/balance?address=${address}`);
  if (!res.ok) return { balance: 0, usd: 0 };
  return res.json();
}

export async function fetchWallets() {
  const res = await fetch("/api/wallets");
  if (!res.ok) return [];
  const data = await res.json();
  return data.wallets;
}

export async function generateWallets(count: number) {
  const res = await fetch("/api/wallets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "generate", count }),
  });
  return res.json();
}

export async function deleteWallets(ids: string[]) {
  const res = await fetch("/api/wallets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "delete", ids }),
  });
  return res.json();
}

export async function createBumpBot(params: {
  tokenAddress: string;
  wallets: number;
  speed: string;
  budget: number;
}) {
  const res = await fetch("/api/bump-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function fetchBumpBots() {
  const res = await fetch("/api/bump-bot");
  if (!res.ok) return [];
  const data = await res.json();
  return data.bots;
}

export async function submitTokenLaunch(params: {
  name: string;
  symbol: string;
  launchMode: string;
  description?: string;
  website?: string;
  xUrl?: string;
  telegram?: string;
}) {
  const res = await fetch("/api/token-launch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function fetchSettings() {
  const res = await fetch("/api/settings");
  if (!res.ok) return null;
  const data = await res.json();
  return data.settings;
}

export async function saveSettings(settings: Record<string, unknown>) {
  const res = await fetch("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  return res.json();
}
