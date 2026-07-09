import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Use public Solana mainnet RPC — swap for a paid endpoint (Helius, QuickNode) for production
const RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

export function getConnection() {
  return new Connection(RPC_URL, "confirmed");
}

export async function getSolBalance(address: string): Promise<number> {
  const conn = getConnection();
  const pubkey = new PublicKey(address);
  const lamports = await conn.getBalance(pubkey);
  return lamports / LAMPORTS_PER_SOL;
}
