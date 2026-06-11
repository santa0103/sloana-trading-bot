"use client";

import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Wallet, Waves, Upload, Info } from "lucide-react";

const STEPS = ["Token basics", "Liquidity", "Review"];

export function RaydiumLaunchPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file) setPicture(file);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Raydium Launch</h1>
            <p className="text-[12px] text-gray-400">Create a token first, then add Raydium liquidity from the terminal.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1.5 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
          <Wallet size={13} />
          Wallets
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  i === step
                    ? "bg-green-500 text-white"
                    : i < step
                    ? "bg-green-200 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-24 h-px mx-2 ${i < step ? "bg-green-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Token basics */}
      {step === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Waves size={18} className="text-green-500" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-gray-800">Token basics</p>
              <p className="text-[12px] text-gray-400">Name, symbol, and picture only.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Name <span className="text-green-500">*</span>
                <Info size={11} className="text-gray-300" />
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Token"
                className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
                Symbol <span className="text-green-500">*</span>
                <Info size={11} className="text-gray-300" />
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="MTK"
                className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-300 focus:outline-none focus:border-green-400 transition-colors bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1 text-[12px] font-medium text-gray-700 mb-1.5">
              Picture <span className="text-green-500">*</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              className={`border border-gray-200 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragOver ? "bg-green-50 border-green-300" : "bg-white hover:bg-gray-50"
              }`}
            >
              {picture ? (
                <p className="text-[12px] text-green-600 font-medium">{picture.name}</p>
              ) : (
                <>
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <p className="text-[12px] text-gray-400">Click or drag to upload</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>
        </div>
      )}

      {/* Step 2 placeholder */}
      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center h-48">
          <p className="text-[13px] text-gray-400">Liquidity configuration — coming soon</p>
        </div>
      )}

      {/* Step 3 placeholder */}
      {step === 2 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center h-48">
          <p className="text-[13px] text-gray-400">Review & launch — coming soon</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-600 transition-colors px-3 py-2"
        >
          <ArrowLeft size={13} />
          Previous
        </button>
        <button
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[13px] font-medium px-8 py-2 rounded transition-colors"
        >
          Next
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
