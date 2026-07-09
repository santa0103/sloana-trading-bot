"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Package, Rocket, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { SolanaIcon } from "@/components/core/solana-icon";
import { paths } from "@/paths";

type Launch = {
  id: string;
  name: string;
  symbol: string;
  launchMode: string;
  status: string;
  txSignature: string | null;
  createdAt: number;
};

export function BundlesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/token-launch");
      const data = await res.json();
      setLaunches(data.launches || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Poll for status updates on pending launches
  useEffect(() => {
    const hasPending = launches.some(l => l.status === "pending");
    if (!hasPending) return;
    const timer = setTimeout(load, 3000);
    return () => clearTimeout(timer);
  }, [launches]);

  const filtered = launches.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalLaunches = launches.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Bundles</h1>
          <p className="text-[12px] text-gray-400">Manage your token launch bundles</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="border border-gray-200 rounded p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => router.push(paths.tokenLaunch)}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium px-4 py-2 rounded transition-colors">
            <Plus size={13} /> New Bundle
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Total Launches</p>
          <p className="text-2xl font-bold text-gray-900">{totalLaunches}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Best Launch</p>
          <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <SolanaIcon size={16} /> 0.00
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Total PnL</p>
          <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <SolanaIcon size={16} /> 0.00
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-64">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bundles..."
          className="w-full border border-gray-200 rounded pl-8 pr-3 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-white focus:outline-none focus:border-green-400 transition-colors" />
      </div>

      {/* List or empty state */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center py-24 gap-3">
          <Package size={36} className="text-gray-300" />
          <p className="text-[13px] text-gray-400">No bundles found</p>
          <button onClick={() => router.push(paths.tokenLaunch)}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium px-4 py-2 rounded transition-colors">
            <Plus size={13} /> Create your first bundle
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {filtered.map(launch => (
            <div key={launch.id}
              onClick={() => setSelected(selected === launch.id ? null : launch.id)}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Rocket size={14} className="text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-800">
                  {launch.name}
                  <span className="text-[11px] text-gray-400 font-normal ml-1">${launch.symbol}</span>
                </p>
                {selected === launch.id && launch.txSignature ? (
                  <p className="text-[10px] text-green-600 font-mono truncate mt-0.5">{launch.txSignature}</p>
                ) : (
                  <p className="text-[10px] text-gray-400 font-mono truncate">
                    {launch.txSignature ? `${launch.txSignature.slice(0, 20)}…` : "pending..."}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 text-right shrink-0">
                <div>
                  <p className="text-[10px] text-gray-400">Mode</p>
                  <p className="text-[12px] text-gray-700 capitalize">{launch.launchMode}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Age</p>
                  <p className="text-[11px] text-gray-500">
                    {Math.round((Date.now() - launch.createdAt) / 60000)}m ago
                  </p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  launch.status === "launched" ? "bg-green-100 text-green-600" :
                  launch.status === "failed" ? "bg-red-100 text-red-500" :
                  "bg-yellow-100 text-yellow-600"
                }`}>{launch.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
