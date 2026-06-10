import { Construction } from "lucide-react";

export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="max-w-full">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">{title}</h1>
      {description && <p className="text-sm text-gray-500 mb-5">{description}</p>}
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center py-24 text-center">
        <Construction size={32} className="text-gray-300 mb-3" />
        <p className="text-[14px] text-gray-400 font-medium">Coming soon</p>
        <p className="text-[12px] text-gray-300 mt-1">This page is under construction</p>
      </div>
    </div>
  );
}
