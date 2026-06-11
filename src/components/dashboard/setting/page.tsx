"use client";

import { useState } from "react";
import { Wallet, Shield, Copy } from "lucide-react";

type Tab = "account" | "referral" | "general" | "quick-actions" | "activity";

const TABS: { key: Tab; label: string }[] = [
  { key: "account", label: "Account" },
  { key: "referral", label: "Referral" },
  { key: "general", label: "General" },
  { key: "quick-actions", label: "Quick Actions" },
  { key: "activity", label: "Activity" },
];

function AccountTab() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("2P7bFx…yM9UHt1");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-[15px] font-semibold text-gray-900">Account</h2>
        <p className="text-[12px] text-gray-400">Your wallet is your identity in Svarog.</p>
      </div>

      {/* Connected Wallet */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
            <Wallet size={13} className="text-green-600" />
          </div>
          <span className="text-[13px] font-semibold text-gray-800">Connected Wallet</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">Your Phantom Wallet</p>
            <p className="text-[13px] font-medium text-gray-800">2P7bFx … yM9UHt1</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1 hover:bg-gray-50 transition-colors"
          >
            <Copy size={12} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-4 pt-4 border-t border-gray-100">
          This is your primary wallet for authentication and withdrawals. All funds will be sent to this address.
        </p>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
            <Shield size={13} className="text-green-600" />
          </div>
          <span className="text-[13px] font-semibold text-gray-800">Security</span>
        </div>

        <ul className="flex flex-col gap-1.5 mb-4">
          {[
            "Your wallet is your identity — never share your seed phrase",
            "All transactions require wallet signature for security",
            "Withdrawals go directly to your connected wallet",
            "If you lose access to your wallet, you lose access to your account",
          ].map((tip) => (
            <li key={tip} className="text-[12px] text-gray-600">• {tip}</li>
          ))}
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-2.5">
          <p className="text-[11px] text-gray-600">
            <span className="font-semibold text-yellow-700">Important:</span>{" "}
            <span className="text-yellow-700">
              This is a Web3 application. Your Phantom wallet is your only way to access your account. Make sure to backup your seed phrase securely.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-center h-48">
      <p className="text-[13px] text-gray-400">{label} — coming soon</p>
    </div>
  );
}

export function SettingPage() {
  const [tab, setTab] = useState<Tab>("account");

  return (
    <div className="mx-[15px]">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-[12px] text-gray-400">Fine-tune default launch preferences, manage reusable presets, and automate wallet behaviour.</p>
      </div>

      {/* Tab bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-1 flex gap-1 mb-5">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
              tab === key ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "account" && <AccountTab />}
      {tab === "referral" && <PlaceholderTab label="Referral" />}
      {tab === "general" && <PlaceholderTab label="General" />}
      {tab === "quick-actions" && <PlaceholderTab label="Quick Actions" />}
      {tab === "activity" && <PlaceholderTab label="Activity" />}
    </div>
  );
}
