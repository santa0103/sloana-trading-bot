"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Waves,
  MessageSquare,
  Package,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { paths } from "@/paths";

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

  return (
    <aside className="flex flex-col w-[160px] min-h-screen bg-[#0d0d0d] text-white shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <span className="font-bold text-lg tracking-wide">SVAROG</span>
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Total Balance */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Total Balance</p>
        <div className="flex items-center gap-1">
          <span className="text-green-400 text-xs">≡</span>
          <span className="text-white font-semibold text-sm">0.000</span>
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
              className={`flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors rounded-sm mx-1 ${
                active
                  ? "bg-green-500/15 text-green-400 font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer wallet */}
      <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[9px] font-bold">
            2
          </div>
          <span className="text-white/50 text-[11px]">2P7b…9UH1</span>
        </div>
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <LogOut size={13} />
        </button>
      </div>
    </aside>
  );
}
