"use client";

import { Rocket, Cpu, Users } from "lucide-react";

const options = [
  {
    key: "new-bundle",
    icon: Rocket,
    title: "NEW BUNDLE",
    description: "Create and launch a new token with bundled wallets",
  },
  {
    key: "vamp",
    icon: Cpu,
    title: "VAMP",
    description: "Copy any token's metadata and launch your own",
  },
  {
    key: "cto",
    icon: Users,
    title: "CTO",
    description: "Take over an existing token with your own wallets",
  },
];

export function TokenLaunchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Token Launch</h1>
      <p className="text-sm text-gray-500 mb-10">Create and bundle your token on Pump.Fun</p>

      <div className="grid flex grid-cols-3 gap-4 w-full max-w-2xl">
        {options.map(({ key, icon: Icon, title, description }) => (
          <button
            key={key}
            className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all group"
          >
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
