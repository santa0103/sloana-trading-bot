"use client";

import { useState, useEffect } from "react";
import { Wallet, Shield, Copy, Sparkles, Settings, Zap, Activity, RefreshCw, Info, RotateCcw, Pencil } from "lucide-react";

type Tab = "account" | "referral" | "general" | "quick-actions" | "activity";

const TABS: { key: Tab; label: string }[] = [
  { key: "account", label: "Account" },
  { key: "referral", label: "Referral" },
  { key: "general", label: "General" },
  { key: "quick-actions", label: "Quick Actions" },
  { key: "activity", label: "Activity" },
];

/* ── Account ── */
function AccountTab() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText("2P7bFx…yM9UHt1"); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-4">
      <div><h2 className="text-[15px] font-semibold text-gray-900">Account</h2><p className="text-[12px] text-gray-400">Your wallet is your identity in Svarog.</p></div>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4"><div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center"><Wallet size={13} className="text-green-600" /></div><span className="text-[13px] font-semibold text-gray-800">Connected Wallet</span></div>
        <div className="flex items-center justify-between">
          <div><p className="text-[11px] text-gray-400 mb-0.5">Your Phantom Wallet</p><p className="text-[13px] font-medium text-gray-800">2P7bFx … yM9UHt1</p></div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1 hover:bg-gray-50 transition-colors"><Copy size={12} />{copied ? "Copied!" : "Copy"}</button>
        </div>
        <p className="text-[11px] text-gray-400 mt-4 pt-4 border-t border-gray-100">This is your primary wallet for authentication and withdrawals. All funds will be sent to this address.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4"><div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center"><Shield size={13} className="text-green-600" /></div><span className="text-[13px] font-semibold text-gray-800">Security</span></div>
        <ul className="flex flex-col gap-1.5 mb-4">{["Your wallet is your identity — never share your seed phrase","All transactions require wallet signature for security","Withdrawals go directly to your connected wallet","If you lose access to your wallet, you lose access to your account"].map(tip => <li key={tip} className="text-[12px] text-gray-600">• {tip}</li>)}</ul>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-2.5"><p className="text-[11px] text-gray-600"><span className="font-semibold text-yellow-700">Important:</span> <span className="text-yellow-700">This is a Web3 application. Your Phantom wallet is your only way to access your account. Make sure to backup your seed phrase securely.</span></p></div>
      </div>
    </div>
  );
}

/* ── Referral ── */
function ReferralTab() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
        <Sparkles size={24} className="text-green-500" />
      </div>
      <div className="text-center">
        <p className="text-[15px] font-semibold text-gray-900 mb-2">Referrals — Coming Soon</p>
        <p className="text-[12px] text-gray-400 max-w-lg leading-relaxed text-center">
          We are putting the finishing touches on the 3-level referral program.
          You will soon be able to earn a share of platform fees from people
          you bring in, their referrals, and the level below that.
        </p>
        <p className="text-[12px] text-gray-400 mt-3">Stay tuned — the tab will light up automatically once it is ready.</p>
      </div>
    </div>
  );
}

/* ── General ── */
const THEMES = [
  { key: "neo", label: "Neo", colors: ["#000000", "#00ff41"] },
  { key: "dark", label: "Dark", colors: ["#1a1a1a", "#333333"] },
  { key: "light", label: "Light", colors: ["#ffffff", "#f0f0f0"], active: true },
  { key: "dusk", label: "Dusk", colors: ["#1e1b4b", "#3730a3"] },
  { key: "astro", label: "Astro", colors: ["#0f172a", "#1e40af"] },
  { key: "crimson", label: "Crimson", colors: ["#1a0000", "#dc2626"] },
  { key: "stealth", label: "Stealth Blue", colors: ["#0a0a1a", "#1d4ed8"] },
  { key: "orange", label: "Orange", colors: ["#1a0a00", "#ea580c"] },
];

function GeneralTab() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [sellSlippage, setSellSlippage] = useState("25");
  const [buySlippage, setBuySlippage] = useState("25");
  const [sniperTip, setSniperTip] = useState("0.002");
  const [bundleTip, setBundleTip] = useState("0.002");
  const [terminal, setTerminal] = useState("axiom");
  const [notifications, setNotifications] = useState(true);
  const [newUserMode, setNewUserMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (!d.settings) return;
      const s = d.settings;
      setSellSlippage(String(s.sellSlippage ?? 25));
      setBuySlippage(String(s.buySlippage ?? 25));
      setSniperTip(String(s.sniperTip ?? 0.002));
      setBundleTip(String(s.bundleTip ?? 0.002));
      setTerminal(s.terminal ?? "axiom");
      setNotifications(s.notifications ?? true);
      setNewUserMode(s.newUserMode ?? false);
      setSelectedTheme(s.theme ?? "light");
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellSlippage: Number(sellSlippage), buySlippage: Number(buySlippage), sniperTip: Number(sniperTip), bundleTip: Number(bundleTip), terminal, notifications, newUserMode, theme: selectedTheme }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div><h2 className="text-[15px] font-semibold text-gray-900">General</h2><p className="text-[12px] text-gray-400">Core preferences and default launch behaviour.</p></div>

      <div className="grid grid-cols-2 gap-4">
        {/* Appearance */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Settings size={13} className="text-gray-500" />
            <p className="text-[13px] font-semibold text-gray-800">Appearance</p>
          </div>
          <p className="text-[11px] text-gray-400 mb-3">Customize Theme</p>
          <p className="text-[11px] text-gray-500 mb-2 font-medium">Theme Presets</p>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map(({ key, label, colors }) => (
              <button key={key} onClick={() => setSelectedTheme(key)}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${selectedTheme === key ? "border-green-400" : "border-transparent hover:border-gray-200"}`}>
                <div className="h-10 w-full flex" style={{ background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 100%)` }} />
                <p className="text-[10px] text-gray-500 text-center py-0.5">{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Swap Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-3">Swap Settings</p>
          {[
            { label: "SELL SLIPPAGE", val: sellSlippage, set: setSellSlippage, suffix: "%" },
            { label: "BUY SLIPPAGE", val: buySlippage, set: setBuySlippage, suffix: "%" },
            { label: "SNIPER TIP", val: sniperTip, set: setSniperTip, suffix: <Zap size={11} className="text-green-500" /> },
            { label: "BUNDLE TIP", val: bundleTip, set: setBundleTip, suffix: <Zap size={11} className="text-green-500" /> },
          ].map(({ label, val, set, suffix }) => (
            <div key={label} className="mb-3">
              <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1 block">{label} <span className="text-red-400">*</span></label>
              <div className="flex items-center border border-gray-200 rounded bg-gray-50">
                <input type="text" value={val} onChange={(e) => set(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-[12px] bg-transparent focus:outline-none text-gray-700" />
                <span className="px-2 text-gray-400">{suffix}</span>
              </div>
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[12px] font-medium py-2 rounded transition-colors">
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Swap Settings"}
            </button>
            <button onClick={() => { setSellSlippage("25"); setBuySlippage("25"); setSniperTip("0.002"); setBundleTip("0.002"); }}
              className="border border-gray-200 hover:bg-gray-50 text-[12px] text-gray-600 px-3 py-2 rounded transition-colors">Reset</button>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-semibold text-gray-800 mb-3">General Settings</p>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Choose Terminal</span>
            <div className="flex gap-1">
              {[
                { key: "axiom", label: "Axiom" },
                { key: "gmgn", label: "GMGN" },
                { key: "pumpfun", label: "PumpFun" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setTerminal(key)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${terminal === key ? "bg-green-500 text-white border-green-500" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Transaction Notifications</span>
            <button onClick={() => setNotifications(v => !v)} className={`w-9 h-5 rounded-full transition-colors relative ${notifications ? "bg-green-500" : "bg-gray-200"}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${notifications ? "left-[18px]" : "left-[3px]"}`} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">New User Mode</span>
            <Info size={11} className="text-gray-300" />
            <button onClick={() => setNewUserMode(v => !v)} className={`w-9 h-5 rounded-full transition-colors relative ${newUserMode ? "bg-green-500" : "bg-gray-800"}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${newUserMode ? "left-[18px]" : "left-[3px]"}`} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Tutorial</span>
            <Info size={11} className="text-gray-300" />
            <button className="flex items-center gap-1 border border-gray-200 rounded px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
              <RotateCcw size={11} /> Start Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Quick Actions ── */
function QuickActionsTab() {
  const [sellMode, setSellMode] = useState<"percentage" | "sol">("percentage");
  const sellPct = ["25%", "50%", "75%", "100%"];
  const sellSol = ["0.1", "0.25", "0.5", "1"];
  const buySol = ["0.1", "0.25", "0.5", "1"];

  return (
    <div className="flex flex-col gap-4">
      <div><h2 className="text-[15px] font-semibold text-gray-900">Quick Actions</h2><p className="text-[12px] text-gray-400">Customise quick action percentages for trading.</p></div>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-semibold text-gray-800">Quick Actions</p>
            <p className="text-[11px] text-gray-400">Configure percentage buttons for Swap Manager</p>
          </div>
          <button className="flex items-center gap-1 border border-gray-200 rounded px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
        </div>

        {/* Default Sell Mode */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] text-gray-500">Default Sell Mode:</span>
          <div className="flex gap-1">
            {(["percentage", "sol"] as const).map(m => (
              <button key={m} onClick={() => setSellMode(m)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${sellMode === m ? "bg-red-100 text-red-500" : "text-gray-400 hover:bg-gray-100"}`}>
                {m === "percentage" ? "Percentage" : "SOL"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Sell % */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-red-500">Sell %</span>
                <span className="text-[9px] bg-red-100 text-red-400 px-1.5 py-0.5 rounded font-medium">Active</span>
              </div>
              <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600"><Pencil size={10} /> Edit</button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {sellPct.map(v => <span key={v} className="px-2.5 py-1 bg-red-50 text-red-400 border border-red-100 rounded text-[11px] font-medium">{v}</span>)}
            </div>
          </div>
          {/* Sell SOL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-red-500">Sell SOL</span>
              <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600"><Pencil size={10} /> Edit</button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {sellSol.map(v => <span key={v} className="px-2.5 py-1 bg-red-50 text-red-400 border border-red-100 rounded text-[11px] font-medium">{v}</span>)}
            </div>
          </div>
          {/* Buy SOL */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-green-500">Buy SOL</span>
              <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600"><Pencil size={10} /> Edit</button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {buySol.map(v => <span key={v} className="px-2.5 py-1 bg-green-50 text-green-500 border border-green-100 rounded text-[11px] font-medium">{v}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Activity ── */
function ActivityTab() {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900">Activity</h2>
          <p className="text-[12px] text-gray-400">All SOL movements across your wallets — deposits, withdrawals, and disperses.</p>
        </div>
        <button onClick={handleRefresh} className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors">
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} /> Refresh
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center py-20 gap-2">
        <Activity size={28} className="text-gray-300 mb-1" />
        <p className="text-[13px] text-gray-500 font-medium">No activity yet</p>
        <p className="text-[11px] text-gray-400">Your deposits, withdrawals, and disperses will appear here</p>
      </div>
    </div>
  );
}

/* ── Main ── */
export function SettingPage() {
  const [tab, setTab] = useState<Tab>("account");
  return (
    <div className="mx-[15px]">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-[12px] text-gray-400">Fine-tune default launch preferences, manage reusable presets, and automate wallet behaviour.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-1 flex gap-1 mb-5">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-1.5 rounded-md text-[12px] font-medium transition-colors ${tab === key ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            {label}
          </button>
        ))}
      </div>
      {tab === "account" && <AccountTab />}
      {tab === "referral" && <ReferralTab />}
      {tab === "general" && <GeneralTab />}
      {tab === "quick-actions" && <QuickActionsTab />}
      {tab === "activity" && <ActivityTab />}
    </div>
  );
}
