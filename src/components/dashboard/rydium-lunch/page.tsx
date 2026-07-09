"use client";

import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Wallet, Waves, Upload, Info, Coins, Shield, CheckCircle, AlertTriangle } from "lucide-react";

const STEPS = ["Token basics", "Supply", "Create"];

export function RaydiumLaunchPage() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  // Step 1
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 2
  const [decimals, setDecimals] = useState("9");
  const [totalSupply, setTotalSupply] = useState("1000000000");
  const [tokenDesc, setTokenDesc] = useState("");

  // Step 3
  const [website, setWebsite] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [revokeFreeze, setRevokeFreeze] = useState(true);
  const [revokeMint, setRevokeMint] = useState(true);
  const [revokeUpdate, setRevokeUpdate] = useState(true);
  const [modifyCreator, setModifyCreator] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ id: string; txSignature: string | null } | null>(null);
  const [submitError, setSubmitError] = useState("");

  const handleFile = (file: File) => { if (file) setPicture(file); };

  const functionsSelected = [revokeFreeze, revokeMint, revokeUpdate, modifyCreator].filter(Boolean).length;
  const totalDue = (0.3 + functionsSelected * 0.1).toFixed(1);

  const validate = (s: number): string[] => {
    const e: string[] = [];
    if (s === 0) {
      if (!name.trim()) e.push("Name is required");
      if (!symbol.trim()) e.push("Symbol is required");
      if (!picture) e.push("Picture is required");
    }
    if (s === 1) {
      if (!decimals.trim()) e.push("Token decimals is required");
      if (!totalSupply.trim()) e.push("Total supply is required");
    }
    return e;
  };

  const goNext = () => {
    const e = validate(step);
    if (e.length) { setErrors(e); return; }
    setErrors([]);
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    const res = await fetch("/api/raydium-launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, symbol, decimals, totalSupply, description: tokenDesc, website, xUrl, telegram, discord }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.launch) setSubmitted(data.launch);
    else setSubmitError(data.error || "Submission failed");
  };

  const goPrev = () => { setErrors([]); setStep(s => Math.max(0, s - 1)); };

  // Step indicator — checkmark for completed
  const StepDot = ({ i }: { i: number }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
      i === step ? "bg-green-500 text-white" : i < step ? "bg-green-100 border border-green-400 text-green-600" : "bg-gray-100 text-gray-400"
    }`}>
      {i < step ? <CheckCircle size={16} className="text-green-500" /> : i + 1}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowLeft size={16} /></button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Raydium Launch</h1>
            <p className="text-[12px] text-gray-400">Create a token first, then add Raydium liquidity from the terminal.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
          <Wallet size={13} /> Wallets
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-6">
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center">
            <StepDot i={i} />
            {i < STEPS.length - 1 && <div className={`w-24 h-px mx-2 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 flex flex-col gap-1">
          {errors.map(e => <p key={e} className="text-[12px] text-red-500">• {e}</p>)}
        </div>
      )}

      {/* ── Step 1: Token basics ── */}
      {step === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Waves size={16} className="text-green-500" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">Token basics</p>
              <p className="text-[11px] text-gray-400">Name, symbol, and picture only.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Name <span className="text-green-500">*</span><Info size={11} className="text-gray-300" />
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Token"
                className={`w-full border rounded px-3 py-2 text-[12px] placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors ${errors.includes("Name is required") ? "border-red-300" : "border-gray-200"}`} />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Symbol <span className="text-green-500">*</span><Info size={11} className="text-gray-300" />
              </label>
              <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="MTK"
                className={`w-full border rounded px-3 py-2 text-[12px] placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors ${errors.includes("Symbol is required") ? "border-red-300" : "border-gray-200"}`} />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
              Picture <span className="text-green-500">*</span>
            </label>
            <div onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              className={`border rounded-lg h-28 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                errors.includes("Picture is required") ? "border-red-300" :
                dragOver ? "bg-green-50 border-green-300" : "border-gray-200 hover:bg-gray-50"
              }`}>
              {picture ? <p className="text-[12px] text-green-600 font-medium">{picture.name}</p> : <><Upload size={18} className="text-gray-400 mb-1" /><p className="text-[12px] text-gray-400">Click or drag to upload</p></>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>
        </div>
      )}

      {/* ── Step 2: Supply ── */}
      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Coins size={16} className="text-green-500" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">Supply</p>
              <p className="text-[11px] text-gray-400">Token decimals, total supply, and description.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Token decimals <span className="text-green-500">*</span><Info size={11} className="text-gray-300" />
              </label>
              <input type="number" value={decimals} onChange={(e) => setDecimals(e.target.value)} placeholder="9"
                className={`w-full border rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors ${errors.includes("Token decimals is required") ? "border-red-300" : "border-gray-200"}`} />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Total supply <span className="text-green-500">*</span><Info size={11} className="text-gray-300" />
              </label>
              <input type="number" value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} placeholder="1000000000"
                className={`w-full border rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors ${errors.includes("Total supply is required") ? "border-red-300" : "border-gray-200"}`} />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
              Token description <span className="text-gray-400 font-normal">(optional)</span><Info size={11} className="text-gray-300" />
            </label>
            <textarea value={tokenDesc} onChange={(e) => setTokenDesc(e.target.value)} placeholder="Enter token description" rows={3}
              className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors resize-none" />
          </div>
        </div>
      )}

      {/* ── Step 3: Create ── */}
      {step === 2 && (
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                <Shield size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800">Create</p>
                <p className="text-[11px] text-gray-400">Review the token create fee, functions, and owner wallet.</p>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Website", val: website, set: setWebsite, ph: "https://" },
                { label: "X URL", val: xUrl, set: setXUrl, ph: "https://x.com/..." },
                { label: "Telegram", val: telegram, set: setTelegram, ph: "https://t.me/..." },
                { label: "Discord", val: discord, set: setDiscord, ph: "https://discord.gg/..." },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1">
                    {label} <span className="text-gray-400 font-normal">(optional)</span><Info size={11} className="text-gray-300" />
                  </label>
                  <input type="text" value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
                    className="w-full border border-gray-200 rounded px-3 py-1.5 text-[12px] bg-gray-50 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors" />
                </div>
              ))}
            </div>

            {/* Launch owner */}
            <div className="border border-gray-200 rounded-lg p-3 mb-4">
              <p className="text-[12px] font-semibold text-gray-800 mb-0.5">Launch owner</p>
              <p className="text-[11px] text-gray-400 mb-3">This app wallet pays, owns the token supply, and signs terminal actions.</p>
              <div className="flex items-center gap-2 mb-2">
                <select className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-[12px] bg-gray-50 focus:outline-none focus:border-green-400 transition-colors text-gray-400">
                  <option>No app wallets found</option>
                </select>
                <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
                  <Wallet size={12} /> Wallets
                </button>
              </div>
              <p className="text-[10px] text-gray-400">This wallet pays the create fee, receives the full token supply, and is used later for pool, buy, sell, and liquidity actions.</p>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
              <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-yellow-700">No app wallet selected. Select a launch owner wallet to continue.</p>
            </div>

            {/* Function toggles */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { key: "modifyCreator", val: modifyCreator, set: setModifyCreator, label: "Modify creator info", desc: "Add creator name and website fields for this launch." },
                { key: "revokeFreeze", val: revokeFreeze, set: setRevokeFreeze, label: "Revoke freeze", desc: "Remove the authority that can freeze holder token accounts." },
                { key: "revokeMint", val: revokeMint, set: setRevokeMint, label: "Revoke mint", desc: "Remove the authority that can mint more tokens after launch." },
                { key: "revokeUpdate", val: revokeUpdate, set: setRevokeUpdate, label: "Revoke update", desc: "Lock the token metadata after the create transaction lands." },
              ].map(({ key, val, set, label, desc }) => (
                <button key={key} onClick={() => set(!val)}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${val ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <p className={`text-[12px] font-semibold ${val ? "text-green-600" : "text-gray-700"}`}>{label}</p>
                      <Info size={10} className="text-gray-300" />
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${val ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                      {val && <CheckCircle size={12} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400">{desc}</p>
                  <p className="text-[10px] text-green-500 font-medium mt-1">+0.1 SOL</p>
                </button>
              ))}
            </div>

            {/* Fee summary */}
            <div className="border border-gray-200 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div><p className="text-[10px] text-gray-400 uppercase mb-0.5">Create fee</p><p className="text-[13px] font-semibold text-gray-800">0.3 SOL</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase mb-0.5">Functions</p><p className="text-[13px] font-semibold text-gray-800">{functionsSelected} selected</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase mb-0.5">Total due</p><p className="text-[13px] font-semibold text-green-500">{totalDue} SOL</p></div>
              </div>
              <p className="text-[10px] text-gray-400 font-mono break-all">C4aEqJScJH9YVM5j5hNVPc6eQ2Cwe4wcnDBkPyPJXQWs</p>
              <p className="text-[10px] text-gray-300 mt-1">Pool creation, Raydium pool fees, gas, and initial liquidity are separate and paid from the launch owner wallet after this create step.</p>
            </div>

            {/* Launch log */}
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-[12px] font-semibold text-gray-800 mb-0.5">Launch log</p>
              <p className="text-[11px] text-gray-400">Logs will appear here after Create Token.</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button onClick={goPrev}
          className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-4 py-2 transition-colors">
          <ArrowLeft size={13} /> Previous
        </button>
        {step < 2 ? (
          <button onClick={goNext}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[13px] font-medium px-8 py-2 rounded transition-colors">
            Next <ArrowRight size={13} />
          </button>
        ) : submitted ? (
          <div className="flex items-center gap-2 bg-green-50 border border-green-300 rounded-lg px-4 py-2">
            <CheckCircle size={14} className="text-green-500" />
            <span className="text-[12px] text-green-700 font-medium">Token created! ID: {submitted.id}</span>
          </div>
        ) : (
          <div className="flex flex-col items-end gap-1">
            {submitError && <p className="text-[11px] text-red-500">{submitError}</p>}
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[13px] font-medium px-6 py-2 rounded transition-colors">
              <Waves size={13} /> {submitting ? "Submitting..." : "Pay Create Fee"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
