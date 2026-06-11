"use client";

import { useState, useRef } from "react";
import { ArrowRight, RefreshCw, Upload } from "lucide-react";

const STEPS = ["Token Info", "Settings"];

export function SpamLaunchPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => { if (file) setPicture(file); };

  return (
    <div className="max-w-2xl mx-auto py-3 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-base font-semibold text-gray-900">Spam Launch</h1>
          <p className="text-[11px] text-gray-400">Create many small deploys from new wallets with controlled delay.</p>
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
          <RefreshCw size={11} />
          Refresh
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-3">
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
              i === step ? "bg-green-500 text-white" : i < step ? "bg-green-200 text-green-700" : "bg-gray-100 text-gray-400"
            }`}>
              {i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-24 h-px mx-2 ${i < step ? "bg-green-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] font-medium text-gray-700 mb-1 block">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Meme Coin"
                className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-700 mb-1 block">Symbol</label>
              <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="MEME"
                className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors" />
            </div>
          </div>

          <div className="mb-3">
            <label className="text-[11px] font-medium text-gray-700 mb-1 block">Picture</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              className={`border border-gray-200 rounded-lg h-16 flex items-center justify-center cursor-pointer gap-2 transition-colors ${
                dragOver ? "bg-green-50 border-green-300" : "bg-white hover:bg-gray-50"
              }`}
            >
              {picture ? (
                <p className="text-[11px] text-green-600 font-medium">{picture.name}</p>
              ) : (
                <>
                  <Upload size={14} className="text-gray-400" />
                  <p className="text-[11px] text-gray-400">Click or drag to upload</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>

          <div className="mb-3">
            <label className="text-[11px] font-medium text-gray-700 mb-1 block">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Token description" rows={2}
              className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { val: website, set: setWebsite, ph: "Website" },
              { val: xUrl, set: setXUrl, ph: "X URL" },
              { val: telegram, set: setTelegram, ph: "Telegram" },
              { val: discord, set: setDiscord, ph: "Discord" },
            ].map(({ val, set, ph }) => (
              <input key={ph} type="text" value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
                className="border border-gray-200 rounded px-2.5 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors" />
            ))}
          </div>

          <div className="flex justify-end">
            <button onClick={() => setStep(1)}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium px-5 py-1.5 rounded transition-colors">
              Next <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-36 mb-3">
          <p className="text-[12px] text-gray-400">Spam settings — coming soon</p>
        </div>
      )}

      {/* Recent Batches */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-[13px] font-semibold text-gray-800 mb-0.5">Recent Batches</p>
        <p className="text-[11px] text-gray-400">No spam batches yet.</p>
      </div>
    </div>
  );
}
