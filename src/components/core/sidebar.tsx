"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Rocket, Waves, MessageSquare, Package,
  Wallet, TrendingUp, Settings, LogOut, RefreshCw,
  DollarSign, BarChart2, Calculator, CalendarDays, X,
} from "lucide-react";
import { paths } from "@/paths";
import { SolanaIcon } from "@/components/core/solana-icon";

const navItems = [
  { label: "Dashboard", href: paths.dashboard, icon: LayoutDashboard },
  { label: "Token Launch", href: paths.tokenLaunch, icon: Rocket },
  { label: "Raydium Launch", href: paths.raydiumLaunch, icon: Waves },
  { label: "Spam Launch", href: paths.spamLaunch, icon: MessageSquare },
  { label: "Bundles", href: paths.bundles, icon: Package },
  { label: "Wallets", href: paths.wallets, icon: Wallet },
  { label: "Bump Bot", href: paths.bumpBot, icon: TrendingUp },
  { label: "Settings", href: paths.settings, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Demo wallet address — in production this comes from wallet adapter
  const DEMO_ADDRESS = "2P7bFxRkJt9KrQanSqYXRcF8fBopzLHYxdM65zcjm";

  const loadBalance = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/balance?address=${DEMO_ADDRESS}`);
      const data = await res.json();
      if (typeof data.balance === "number") setSolBalance(data.balance);
    } catch {
      // keep current value
    }
    setRefreshing(false);
  };

  useEffect(() => { loadBalance(); }, []);

  return (
    <aside className="flex flex-col w-[176px] min-h-screen bg-white text-black shrink-0 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-between px-[18px] py-[13px] border-b border-gray-200">
        <span className="font-bold text-xl tracking-wide">SVAROG</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={15} />
        </button>
      </div>

      {/* Total Balance */}
      <div className="px-[18px] py-[13px] border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <p className="text-gray-400 text-[11px] uppercase tracking-widest">Total Balance</p>
          <button onClick={loadBalance} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <SolanaIcon size={13} />
          <span className="text-black font-semibold text-[15px]">
            {solBalance !== null ? solBalance.toFixed(4) : "0.000"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-[18px] py-[9px] text-[14px] transition-colors rounded-sm mx-1 ${
                active
                  ? "bg-green-500/15 text-green-500 font-medium"
                  : "text-gray-500 hover:text-black hover:bg-gray-100"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer wallet */}
      <div className="border-t border-gray-200 px-[18px] py-[13px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[12px] font-bold text-green-600">
            2
          </div>
          <span className="text-gray-700 text-[13px] font-medium">2P7b…9UH1</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <LogOut size={15} />
        </button>
      </div>

      {/* Action bar */}
      <div className="border-t border-gray-200 px-[13px] py-[0px] flex items-center gap-1">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("svarog:withdraw"))}
          className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-600 text-[12px] font-medium px-3 py-[7px] rounded transition-colors">
          <DollarSign size={12} />
          Withdrawal
        </button>
        <div className="w-px h-[22px] bg-gray-200 mx-1" />
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("svarog:pnl"))}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-[12px] px-[7px] py-[7px] rounded hover:bg-gray-100 transition-colors">
          <BarChart2 size={14} />
          PnL
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("svarog:calc"))}
          className="text-gray-400 hover:text-gray-600 p-[7px] rounded hover:bg-gray-100 transition-colors">
          <Calculator size={14} />
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("svarog:calendar"))}
          className="text-gray-400 hover:text-gray-600 p-[7px] rounded hover:bg-gray-100 transition-colors">
          <CalendarDays size={14} />
        </button>
      </div>
    </aside>
  );
}
