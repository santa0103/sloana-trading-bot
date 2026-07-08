"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Download, BarChart2, Calculator, CalendarDays, Grid2x2, Percent, TrendingUp, Coins, ChevronLeft, ChevronRight, X, DollarSign, Copy, Gift } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";
import Image from "next/image";
import downloadIcon from "@/assets/icon-img/download.jpg";

const SOL_PRICE = 64.0;
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { const d = new Date(year, month, 1).getDay(); return (d + 6) % 7; }

/* ── Withdrawal Modal ── */
function WithdrawalModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-end justify-start" style={{ paddingLeft: 176, paddingBottom: 46 }}>
      <div ref={ref} className="bg-white rounded-2xl shadow-2xl w-[320px] p-5 mb-1 ml-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-500" />
            <span className="text-[16px] font-bold text-gray-900">Withdrawal</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigator.clipboard.writeText("2P7b ... 9UH1")} className="text-gray-400 hover:text-gray-600 transition-colors"><Copy size={14} /></button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={14} /></button>
          </div>
        </div>

        {/* Payout address */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] text-gray-400">Payout Address</span>
            <span className="flex items-center gap-1 text-[12px] text-green-500 font-medium">
              <div className="w-3.5 h-3.5 rounded bg-green-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-sm bg-green-500" />
              </div>
              Connected Wallet
            </span>
          </div>
          <p className="text-[14px] font-medium text-gray-800">2P7b ... 9UH1</p>
        </div>

        {/* Balance */}
        <div className="mb-5">
          <p className="text-[12px] text-gray-400 mb-1">Total Balance (All Wallets)</p>
          <div className="flex items-center gap-2">
            <SolanaIcon size={18} />
            <span className="text-[22px] font-bold text-gray-900">0.000</span>
            <span className="text-[14px] text-gray-400">≈ $0.00</span>
          </div>
          <p className="text-[12px] text-gray-400 mt-0.5">0 wallets</p>
        </div>

        {/* Withdraw from dropdown */}
        <div className="border border-gray-200 rounded-lg px-3 py-2.5 flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div>
            <p className="text-[11px] text-gray-400">Withdraw from</p>
            <p className="text-[13px] font-semibold text-gray-700">No wallets with balance</p>
          </div>
          <ChevronRight size={14} className="text-gray-400 rotate-90" />
        </div>

        {/* Collect button */}
        <button className="w-full flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white text-[14px] font-semibold py-3 rounded-xl transition-colors mb-3">
          <Download size={15} />
          Collect from 0 wallets
        </button>

        {/* Claim buttons */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-[13px] font-medium py-2.5 rounded-xl transition-colors mb-2">
          <Gift size={14} className="text-gray-500" />
          Claim Creator Rewards
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-[13px] font-medium py-2.5 rounded-xl transition-colors mb-4">
          <Gift size={14} className="text-gray-500" />
          Claim Wallets Cashback
        </button>

        <p className="text-center text-[11px] text-gray-400 leading-relaxed">
          Rewards / cashback land on your wallets — use<br />Withdraw to send to your connected wallet
        </p>
      </div>
    </div>
  );
}

/* ── PNL Calendar Modal ── */
function PnlCalendar({ onClose }: { onClose: () => void }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-[504px] p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[18px] font-semibold text-gray-900">PNL Calendar</span>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="p-1 hover:bg-gray-100 rounded transition-colors"><ChevronLeft size={18} className="text-gray-500" /></button>
            <span className="text-[15px] font-medium text-gray-700 w-28 text-center">{MONTHS[month]} {year}</span>
            <button onClick={next} className="p-1 hover:bg-gray-100 rounded transition-colors"><ChevronRight size={18} className="text-gray-500" /></button>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors ml-1"><X size={16} className="text-gray-400" /></button>
          </div>
        </div>
        <div className="mb-4 pb-4 border-b-2 border-red-400">
          <div className="flex items-center gap-2">
            <SolanaIcon size={17} />
            <span className="text-[22px] font-bold text-green-500">0.00</span>
          </div>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-[14px] text-gray-400 font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, i) => (
            <div key={i} className={`flex flex-col items-center py-2.5 ${day ? "hover:bg-gray-50 rounded cursor-pointer" : ""}`}>
              {day && (
                <>
                  <span className="text-[15px] text-gray-700">{day}</span>
                  <span className="text-[11px] text-gray-400">0.00</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Draggable PnL Widget ── */
function PnlWidget({ onClose }: { onClose: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 80 });
  const initialized = useRef(false);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!initialized.current) {
      setPos({ x: window.innerWidth - 320, y: 80 });
      initialized.current = true;
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-[264px] select-none"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Drag handle / title bar */}
      <div
        onMouseDown={onMouseDown}
        className="flex items-center justify-between px-3 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing rounded-t-xl bg-gray-50"
      >
        <div className="flex items-center gap-1.5">
          <BarChart2 size={14} className="text-gray-400" />
          <span className="text-[13px] font-medium text-gray-500 uppercase tracking-wide">PnL</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-gray-300 hover:text-gray-500 transition-colors text-[16px] leading-none px-1">−</button>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 transition-colors"><X size={14} /></button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 px-1 py-4">
        <div className="flex flex-col items-center gap-1 px-4">
          <div className="flex items-center gap-1">
            <SolanaIcon size={17} />
            <span className="text-[19px] font-bold text-gray-900">0.00</span>
          </div>
          <span className="text-[12px] text-gray-400">Balance</span>
        </div>
        <div className="flex flex-col items-center gap-1 px-4">
          <div className="flex items-center gap-1">
            <SolanaIcon size={17} />
            <span className="text-[19px] font-bold text-green-500">0.00</span>
          </div>
          <span className="text-[12px] text-gray-400">PNL</span>
        </div>
      </div>
    </div>
  );
}


function SupplyCalculator({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const sol = parseFloat(amount) || 0;
  const supply = sol > 0 ? Math.min((sol / 85) * 100, 100) : 0;
  const marketCap = sol * SOL_PRICE;
  const tokens = Math.floor(sol * 1_000_000_000);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute bottom-full left-0 mb-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center"><Grid2x2 size={14} className="text-green-600" /></div>
        <span className="text-[15px] font-semibold text-gray-900">Supply Calculator</span>
      </div>
      <div className="mb-4">
        <label className="text-[12px] text-gray-400 mb-1.5 block">Enter bundle amount</label>
        <div className="flex items-center justify-between border-2 border-green-400 rounded-lg px-3 py-2.5 bg-gray-50">
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent text-[15px] text-gray-800 font-medium w-full focus:outline-none" min={0} />
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium shrink-0"><SolanaIcon size={13} /> SOL</div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-gray-100">
        {[
          { icon: <SolanaIcon size={13} />, label: "SOL Price", value: `$${SOL_PRICE.toFixed(1)}`, color: "text-gray-800" },
          { icon: <Percent size={13} className="text-gray-400" />, label: "Supply", value: `${supply.toFixed(0)}%`, color: "text-green-500 font-semibold" },
          { icon: <BarChart2 size={13} className="text-gray-400" />, label: "Market Cap", value: `$${marketCap.toFixed(0)}`, color: "text-gray-800" },
          { icon: <Coins size={13} className="text-gray-400" />, label: "Tokens", value: tokens.toLocaleString(), color: "text-gray-800" },
          { icon: <TrendingUp size={13} className="text-gray-400" />, label: "Bonding Curve", value: `${supply.toFixed(0)}%`, color: "text-gray-800" },
        ].map(({ icon, label, value, color }) => (
          <div key={label} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-[13px] text-gray-600">{icon}{label}</div>
            <span className={`text-[13px] ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Footer ── */
export function FooterBar() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [pnlOpen, setPnlOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    const onWithdraw = () => setWithdrawOpen(true);
    const onPnl = () => setPnlOpen(o => !o);
    const onCalc = () => setCalcOpen(o => !o);
    const onCal = () => setCalOpen(true);
    window.addEventListener("svarog:withdraw", onWithdraw);
    window.addEventListener("svarog:pnl", onPnl);
    window.addEventListener("svarog:calc", onCalc);
    window.addEventListener("svarog:calendar", onCal);
    return () => {
      window.removeEventListener("svarog:withdraw", onWithdraw);
      window.removeEventListener("svarog:pnl", onPnl);
      window.removeEventListener("svarog:calc", onCalc);
      window.removeEventListener("svarog:calendar", onCal);
    };
  }, []);

  return (
    <>
      {withdrawOpen && <WithdrawalModal onClose={() => setWithdrawOpen(false)} />}
      {pnlOpen && <PnlWidget onClose={() => setPnlOpen(false)} />}
      {calOpen && <PnlCalendar onClose={() => setCalOpen(false)} />}
      <footer className="relative h-[46px] bg-white border-t border-gray-200 flex items-center justify-between px-[18px] text-black shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => setWithdrawOpen((o) => !o)}
            className="bg-green-600 hover:bg-green-700 text-white text-[12px] font-medium px-3 py-[4px] rounded transition-colors flex items-center gap-1.5">
            <Download size={13} />
            Withdraw
          </button>
          <button onClick={() => setPnlOpen((o) => !o)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-[12px] border border-gray-200 rounded px-2 py-[3px] hover:bg-gray-50 transition-colors">
            <BarChart2 size={13} />
            P&amp;L
          </button>
          <div className="relative">
            <button onClick={() => setCalcOpen((o) => !o)}
              className={`border rounded p-[4px] hover:bg-gray-50 transition-colors ${calcOpen ? "border-green-400 text-green-600 bg-green-50" : "border-gray-200 text-gray-400 hover:text-gray-600"}`}>
              <Calculator size={13} />
            </button>
            {calcOpen && <SupplyCalculator onClose={() => setCalcOpen(false)} />}
          </div>
          <button onClick={() => setCalOpen(true)}
            className="border border-gray-200 rounded p-[4px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <CalendarDays size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[12px]">
          <span className="flex items-center gap-1 border border-gray-200 rounded px-2 py-[3px]">
            <SolanaIcon size={13} />
            <span className="text-gray-600">$63.22</span>
          </span>
          <span className="flex items-center gap-1 border border-gray-200 rounded px-2 py-[3px] text-gray-400">
            <Image src={downloadIcon} alt="sol" width={13} height={13} className="rounded-full object-cover" />
            33.314
          </span>
        </div>

        <div className="flex items-center gap-2 text-[12px]">
          <button className="border border-gray-200 rounded p-[4px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <Bell size={13} />
          </button>
          <span className="text-gray-400">EU-C 30as</span>
          <span className="flex items-center gap-1 text-green-500">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Connected
          </span>
        </div>
      </footer>
    </>
  );
}
