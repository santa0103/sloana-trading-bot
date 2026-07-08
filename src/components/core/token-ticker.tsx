"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const BASE_PRICES: Record<string, number> = {
  CAINYARF: 3700,
  GAFJOOK: 284400,
  ABFI: 2400,
  CFRBY: 16000,
  USDC: 4300,
  "BRÖTCHEN": 1321000,
  SHABANI: 38800,
  BIBI: 780100,
  WIF: 1000,
  FU: 51900,
  HOBB: 420,
};

const TOKEN_IMGS: Record<string, string> = {
  CAINYARF: "/token-imgs/bafybeiagmzymketzq35xc5ls36ioa2tuxaclz5brwzv7z3x74x3lval7m4.jpg",
  GAFJOOK: "/token-imgs/bafkreiaivsgzxur2d4sjbwxajyv6frmx2xgbij2wd6ypogkhtlzswmemhi.jpg",
  ABFI: "/token-imgs/bafybeid3uv6mbvunbeqojiwkphrtsrh33mi3oxszlx2ig4p23xj7js4gd4.jpg",
  CFRBY: "/token-imgs/bafybeid6dsofb5ufmsqsbdtga5zywb7yqeee2xblbxnzozsp4ob6booqly.png",
  USDC: "/token-imgs/bafybeidcwp45v63pjipe4avaeez6pkbqxr737yb4eogmzn5tk43x2iegj4.png",
  "BRÖTCHEN": "/token-imgs/bafybeidr7nt5fhusgd6exusjbeew6sltkntmd5jeoleizogdwnxe5c6lqy.png",
  SHABANI: "/token-imgs/bafybeiek2ffwfeu5und75kkdrwx66c3yahjfqb7whutgi5ygkxenmqzuaa.png",
  BIBI: "/token-imgs/bafybeiflaf6be6dnrf4ujuhxqozbuaexmuhtr7kqjerdfk6anr56bo6z3q.png",
  WIF: "/token-imgs/bafybeiflipwu3pe4wqqxkeezazkjrczsnroyksavjnokivqaiov6gk76gi.png",
  FU: "/token-imgs/bafybeigkyw4quomoqezda3g3upt672wowfhum6d7cpjrrv2uypqnik7rqi.png",
  HOBB: "/token-imgs/9E6u2yFx9wzMsEMBMRoLwaGVhBwzx2LoJWTtyeh8pump.webp",
};

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function jitter(base: number): number {
  // ±2% random walk
  return base * (1 + (Math.random() - 0.5) * 0.04);
}

export function TokenTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [prices, setPrices] = useState<Record<string, number>>({ ...BASE_PRICES });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const next: Record<string, number> = {};
        for (const key of Object.keys(prev)) next[key] = jitter(prev[key]);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="bg-white border-b border-gray-200 h-[54px] flex items-center">
      <div className="shrink-0 px-3 border-r border-gray-200 h-full flex items-center">
        <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Trending</span>
      </div>
      <div ref={scrollRef} onWheel={handleWheel}
        className="flex items-center gap-1 overflow-x-auto flex-1 px-2 h-full token-ticker"
        style={{ scrollbarWidth: "none" }}>
        {Object.keys(BASE_PRICES).map((name) => (
          <div key={name} className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors">
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden shrink-0 bg-gray-200">
              <Image src={TOKEN_IMGS[name]} alt={name} width={22} height={22} className="object-cover w-full h-full" />
            </div>
            <span className="text-[12px] font-medium text-gray-700">{name}</span>
            <span className="text-[12px] text-green-600 font-semibold transition-all">{formatPrice(prices[name])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
