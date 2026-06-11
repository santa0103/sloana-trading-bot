"use client";

import { useState, useRef } from "react";
import { Rocket, Cpu, Users, ArrowLeft, Upload, Plus, RefreshCw, Globe, Send, Download, Wallet, Shield, Zap, CheckCircle, Clock, Copy } from "lucide-react";

const STEPS = ["Metadata", "Buy Mode", "Wallets", "Settings", "Review"];

/* ── Step indicator ── */
function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
            i === step ? "bg-green-500 text-white" : i < step ? "bg-green-100 text-green-600 border border-green-300" : "bg-gray-100 text-gray-400"
          }`}>{i + 1}</div>
          {i < total - 1 && <div className={`w-16 h-px mx-1 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: Buy Mode ── */
function Step2BuyMode({ onContinue }: { onContinue: () => void }) {
  const [selected, setSelected] = useState<string>("bundle");
  const modes = [
    { key: "snipe", icon: <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center"><Zap size={16} className="text-gray-500" /></div>, title: "Snipe", desc: "Automatically snipe the token immediately after launch with configured wallets" },
    { key: "bundle", icon: <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center"><Rocket size={16} className="text-white" /></div>, title: "Bundle", desc: "Bundle multiple buy transactions together in a single block for better execution" },
    { key: "launch-bundle-snipe", icon: <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center"><Rocket size={16} className="text-gray-500" /></div>, title: "Launch + Bundle + Snipe", desc: "Complete launch flow: create token, bundle initial buys, and snipe in one operation" },
    { key: "dev-buy", icon: <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center"><Users size={16} className="text-gray-500" /></div>, title: "Dev Buy Only", desc: "Only the dev wallet will buy tokens at launch, no additional bundle or snipe" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] text-gray-500 mb-1">Select how you want to buy tokens at launch. Each mode has different strategies and requirements.</p>
      {modes.map((m) => (
        <button key={m.key} onClick={() => setSelected(m.key)}
          className={`flex items-center gap-4 px-4 py-3.5 rounded-lg border-2 text-left transition-colors ${selected === m.key ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
          {m.icon}
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-800">{m.title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{m.desc}</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === m.key ? "border-green-500" : "border-gray-300"}`}>
            {selected === m.key && <div className="w-2 h-2 rounded-full bg-green-500" />}
          </div>
        </button>
      ))}
      <button onClick={onContinue} className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors mt-2">Continue</button>
    </div>
  );
}

/* ── Step 3: Wallets ── */
function Step3Wallets({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { icon: <Plus size={11} />, label: "Dev" },
          { icon: <RefreshCw size={11} />, label: "Create" },
          { icon: <Globe size={11} />, label: "My Wallets" },
          { icon: <Send size={11} />, label: "Fund" },
          { icon: <Upload size={11} />, label: "Import" },
          { icon: <Download size={11} />, label: "Export" },
        ].map(({ icon, label }) => (
          <button key={label} className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            {icon}{label}
          </button>
        ))}
      </div>

      {/* Wallets area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] text-gray-500">Wallets (0)</span>
          <span className="text-[12px] text-gray-400">0 selected</span>
        </div>
        <div className="border border-gray-200 rounded-lg flex flex-col items-center justify-center py-16 gap-2 bg-white">
          <Wallet size={32} className="text-gray-300" />
          <p className="text-[13px] text-gray-400 font-medium">No wallets added yet</p>
          <p className="text-[11px] text-gray-300">Click +Dev or Create to add wallets</p>
        </div>
      </div>
      <button onClick={onContinue} className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors">Continue</button>
    </div>
  );
}

/* ── Step 4: Settings ── */
function Step4Settings({ onContinue }: { onContinue: () => void }) {
  const [slippage, setSlippage] = useState(15);
  const [jitoTip, setJitoTip] = useState("0.001");
  const [antiSniper, setAntiSniper] = useState(true);
  const [advTab, setAdvTab] = useState("anti-sniper");

  return (
    <div className="flex flex-col gap-3">
      {/* Bundle Settings */}
      <div>
        <p className="text-[12px] font-semibold text-gray-800 mb-1.5">Bundle Settings</p>
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-4 gap-0.5 bg-white">
          <p className="text-[11px] text-gray-400">No wallets created yet.</p>
          <p className="text-[10px] text-gray-300">Go back to Step 3 to create wallets first.</p>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* General Settings */}
      <div>
        <p className="text-[12px] font-semibold text-gray-800 mb-2">General Settings</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] text-gray-600">Slippage (%)</label>
              <span className="text-[11px] font-semibold text-green-500">{slippage}%</span>
            </div>
            <input type="range" min={1} max={100} value={slippage} onChange={(e) => setSlippage(Number(e.target.value))}
              className="w-full accent-green-500 h-1.5 rounded" />
          </div>
          <div>
            <label className="text-[11px] text-gray-600 mb-1 block">Jito Tip (SOL)</label>
            <input type="number" value={jitoTip} onChange={(e) => setJitoTip(e.target.value)}
              className="w-full border border-gray-200 rounded px-2.5 py-1 text-[11px] bg-gray-50 focus:outline-none focus:border-green-400 transition-colors" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Advanced Settings */}
      <div>
        <p className="text-[12px] font-semibold text-gray-800 mb-2">Advanced Settings</p>
        <div className="flex gap-1 mb-2 border-b border-gray-100">
          {["anti-sniper", "smart-sell", "auto-tp", "retry"].map((t) => (
            <button key={t} onClick={() => setAdvTab(t)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-t transition-colors ${advTab === t ? "bg-white border border-b-white border-gray-200 text-gray-800" : "text-gray-400 hover:text-gray-600"}`}>
              {t.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </button>
          ))}
        </div>
        {advTab === "anti-sniper" && (
          <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield size={13} className="text-green-500" />
              <div>
                <p className="text-[12px] font-medium text-gray-800">Anti Sniper</p>
                <p className="text-[10px] text-gray-400">Sell all if external snipers detected after launch</p>
              </div>
            </div>
            <button onClick={() => setAntiSniper(v => !v)}
              className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${antiSniper ? "bg-gray-800" : "bg-gray-200"}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${antiSniper ? "left-[18px]" : "left-[3px]"}`} />
            </button>
          </div>
        )}
      </div>

      {/* Automations */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Zap size={12} className="text-green-400" />
            <span className="text-[12px] font-semibold text-gray-800">Automations</span>
            <span className="text-[10px] text-gray-400">(Optional)</span>
          </div>
          <button className="flex items-center gap-1 border border-gray-200 rounded px-2 py-0.5 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
            <Plus size={10} /> Add
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mb-1.5 leading-relaxed">Pre-configure a Bump Bot — it stays Ready and waits for you to click Start in the trade terminal once the token is live.</p>
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-4 gap-0.5 bg-white">
          <Zap size={20} className="text-gray-200" />
          <p className="text-[11px] text-gray-400">No automations configured</p>
          <p className="text-[10px] text-gray-300">Add a Bump Bot to be ready right after launch</p>
        </div>
      </div>

      <button onClick={onContinue} className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2 rounded-lg transition-colors">Continue</button>
    </div>
  );
}

/* ── Step 5: Review ── */
function Step5Review({ name, launchMode }: { name: string; launchMode: string }) {
  const [mintSuffix, setMintSuffix] = useState<"pump" | "default" | "custom">("pump");
  const ca = "YfKGak5vm3NuRWmCzj3jgj9DKb8QGkNZPsEgsdGpump";

  const checklist = [
    { label: "Token metadata", ok: !!name },
    { label: "Dev wallet created", ok: false },
    { label: "Wallets configured", ok: false },
    { label: "Buy mode selected", ok: true },
    { label: "Settings configured", ok: true },
    { label: "Wallet keys backed up", ok: false },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Pre-launch checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-semibold text-gray-800 mb-3">Pre-launch Checklist</p>
        <div className="flex flex-col gap-2">
          {checklist.map(({ label, ok }) => (
            <div key={label} className="flex items-center gap-2">
              {ok
                ? <CheckCircle size={15} className="text-green-500 shrink-0" />
                : <Clock size={15} className="text-yellow-400 shrink-0" />}
              <span className={`text-[12px] ${ok ? "text-gray-600" : "text-yellow-600 underline cursor-pointer"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Token Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-semibold text-gray-800 mb-3">Token Preview</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-bold">?</div>
          <div>
            <p className="text-[14px] font-semibold text-gray-800">{name || "Unnamed Token"}</p>
            <p className="text-[12px] text-gray-400">$???</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-gray-400">Mint suffix</span>
          <div className="flex gap-1">
            {(["pump", "default", "custom"] as const).map((s) => (
              <button key={s} onClick={() => setMintSuffix(s)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${mintSuffix === s ? "bg-green-500 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
          <div>
            <p className="text-[10px] text-gray-400 mb-0.5">CA:</p>
            <p className="text-[11px] text-gray-700 font-mono">{ca}</p>
            <p className="text-[9px] text-gray-300 mt-0.5">Reserved 30 min. Released automatically if you leave the page.</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors ml-2"><Copy size={13} /></button>
        </div>
      </div>

      {/* Launch Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-semibold text-gray-800 mb-3">Launch Configuration</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] text-gray-400 mb-1">Platform</p>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><Rocket size={9} className="text-white" /></div>
              <span className="text-[13px] text-gray-700">Pump.fun</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 mb-1">Mode</p>
            <span className="text-[13px] text-gray-700 capitalize">{launchMode}</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Rocket size={14} /> Launch Token
      </button>
    </div>
  );
}

/* ── New Bundle wizard ── */
function NewBundleWizard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [telegram, setTelegram] = useState("");
  const [launchMode, setLaunchMode] = useState<"classic" | "mayhem">("classic");
  const [cashback, setCashback] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = (f: File) => { if (f) setPicture(f); };
  const next = () => setStep(s => s + 1);

  return (
    <div className="py-4 px-4">
      {/* Header — top left */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-0.5">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={14} />
          </button>
          <h1 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide">New Bundle</h1>
        </div>
        <p className="text-[12px] text-gray-400 pl-6">Step {step + 1} of {STEPS.length} - {STEPS[step]}</p>
      </div>

      {/* Rest — centered */}
      <div className="max-w-2xl mx-auto">
        <StepIndicator step={step} total={STEPS.length} />

        {/* Step 1 — Metadata */}
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-medium text-gray-700 mb-1 block">Name <span className="text-red-400">*</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Token"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-gray-700 mb-1 block">Symbol <span className="text-red-400">*</span></label>
                <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="MTK"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-700 mb-1 block">Description <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, 500))} placeholder="Describe your token..." rows={3}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors resize-none" />
                <span className="absolute bottom-2 right-2 text-[10px] text-gray-300">{description.length}/500</span>
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-700 mb-1 block">Select Image <span className="text-red-400">*</span></label>
              <div onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                className={`border border-dashed rounded-lg h-24 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${dragOver ? "border-green-400 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}>
                {picture ? <p className="text-[12px] text-green-600 font-medium">{picture.name}</p> : <><Upload size={18} className="text-gray-400" /><p className="text-[12px] text-gray-400">Click or drag to upload</p></>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Website", val: website, set: setWebsite, ph: "https://" }, { label: "X URL", val: xUrl, set: setXUrl, ph: "https://x.com/..." }, { label: "Telegram", val: telegram, set: setTelegram, ph: "https://t.me/..." }].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label className="text-[12px] font-medium text-gray-700 mb-1 block">{label} <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input type="text" value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-[12px] font-medium text-gray-700 mb-2 block">Launch Mode</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ key: "classic", label: "Classic", sub: "Standard 1B supply" }, { key: "mayhem", label: "Mayhem", sub: "2B supply · AI agent · 24h" }].map(({ key, label, sub }) => (
                  <button key={key} onClick={() => setLaunchMode(key as "classic" | "mayhem")}
                    className={`text-left px-4 py-3 rounded-lg border-2 transition-colors ${launchMode === key ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <p className={`text-[13px] font-semibold ${launchMode === key ? "text-green-600" : "text-gray-700"}`}>{label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-start gap-3">
              <input type="checkbox" id="cashback" checked={cashback} onChange={(e) => setCashback(e.target.checked)} className="mt-0.5 accent-green-500 w-4 h-4 cursor-pointer" />
              <label htmlFor="cashback" className="cursor-pointer">
                <p className="text-[13px] font-medium text-gray-700">Enable Cashback</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Creator fees: % traders proportional to their volume.</p>
              </label>
            </div>
            <button onClick={next} className="w-full bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors">Continue</button>
          </div>
        )}

        {step === 1 && <Step2BuyMode onContinue={next} />}
        {step === 2 && <Step3Wallets onContinue={next} />}
        {step === 3 && <Step4Settings onContinue={next} />}
        {step === 4 && <Step5Review name={name} launchMode={launchMode} />}
      </div>
    </div>
  );
}

/* ── Token Launch selection page ── */
const options = [
  { key: "new-bundle", icon: Rocket, title: "NEW BUNDLE", description: "Create and launch a new token with bundled wallets" },
  { key: "vamp", icon: Cpu, title: "VAMP", description: "Copy any token's metadata and launch your own" },
  { key: "cto", icon: Users, title: "CTO", description: "Take over an existing token with your own wallets" },
];

export function TokenLaunchPage() {
  const [view, setView] = useState<"select" | "new-bundle">("select");
  if (view === "new-bundle") return <NewBundleWizard onBack={() => setView("select")} />;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Token Launch</h1>
      <p className="text-sm text-gray-500 mb-10">Create and bundle your token on Pump.Fun</p>
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {options.map(({ key, icon: Icon, title, description }) => (
          <button key={key} onClick={() => key === "new-bundle" && setView("new-bundle")}
            className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all group">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <Icon size={24} className="text-green-500" />
            </div>
            <span className="text-[13px] font-semibold text-gray-800 mb-2">{title}</span>
            <span className="text-[12px] text-gray-400 leading-relaxed">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
