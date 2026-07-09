"use client";

import { Package, Wallet, Rocket } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";
import { useState, useEffect } from "react";

function StatCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-medium text-gray-700">{title}</span>
        <Icon size={14} className="text-green-500" />
      </div>
      {children}
    </div>
  );
}

export function DashboardPage() {
  const [solPrice, setSolPrice] = useState(64);

  useEffect(() => {
    fetch("/api/sol-price")
      .then(r => r.json())
      .then(d => { if (d.price) setSolPrice(d.price); });
    const i = setInterval(() => {
      fetch("/api/sol-price").then(r => r.json()).then(d => { if (d.price) setSolPrice(d.price); });
    }, 15000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="max-w-full">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-5">Overview of your bundler activity</p>

      <div className="grid grid-cols-[1fr_220px] gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Earnings Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-medium text-gray-700">Earnings Overview</span>
            </div>
            <div className="flex gap-6 mb-4">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Last 30 days</p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <SolanaIcon size={13} /> 0.00 ≈ $0.00
                </p>
                <p className="text-[10px] text-gray-400">↑ +0.0%</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Today</p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <SolanaIcon size={13} /> 0.00 ≈ $0.00
                </p>
                <p className="text-[10px] text-gray-400">↑ +0.0 SOL</p>
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="relative h-36 flex items-center justify-center border border-dashed border-gray-200 rounded-md bg-gray-50">
              <div className="text-center">
                <Rocket size={20} className="text-gray-300 mx-auto mb-1" />
                <p className="text-[12px] text-gray-400 font-medium">No trading activity yet</p>
                <p className="text-[11px] text-gray-300">Launch your first bundle to see earnings</p>
              </div>
              {/* X-axis labels */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
                {["May 29", "May 30", "May 31", "Jun 1", "Jun 2", "Jun 3", "Jun 4", "Jun 5", "Jun 6", "Jun 7", "Jun 8", "Jun 9", "Jun 10", "Jun 11"].map(
                  (d) => (
                    <span key={d} className="text-[9px] text-gray-300">
                      {d}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <span className="text-[13px] font-medium text-gray-700">Recent Activity</span>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Rocket size={28} className="text-gray-300 mb-2" />
              <p className="text-[13px] text-gray-400 font-medium">No recent activity</p>
              <p className="text-[11px] text-gray-300">Launch your first bundle to see activity here</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <StatCard title="Bundles Launched" icon={Package}>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-[11px] text-gray-400 mt-1">No launches yet</p>
          </StatCard>

          <StatCard title="Total Balance" icon={Wallet}>
            <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
              <SolanaIcon size={18} /> 0.000
            </p>
            <p className="text-[11px] text-gray-400 mt-1">1 SOL ≈ ${solPrice.toFixed(2)}</p>
          </StatCard>
        </div>
      </div>
    </div>
  );
}
