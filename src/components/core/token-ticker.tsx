"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Token mint addresses mapped to display names
const TOKEN_MINTS: Record<string, string> = {
  CAINYARF: "bafybeiagmzymketzq35xc5ls36ioa2tuxaclz5brwzv7z3x74x3lval7m4",
  GAFJOOK:  "bafkreiaivsgzxur2d4sjbwxajyv6frmx2xgbij2wd6ypogkhtlzswmemhi",
  ABFI:     "bafybeid3uv6mbvunbeqojiwkphrtsrh33mi3oxszlx2ig4p23xj7js4gd4",
  CFRBY:    "bafybeid6dsofb5ufmsqsbdtga5zywb7yqeee2xblbxnzozsp4ob6booqly",
  USDC:     "bafybeidcwp45v63pjipe4avaeez6pkbqxr737yb4eogmzn5tk43x2iegj4",
  "BRÖTCHEN": "bafybeidr7nt5fhusgd6exusjbeew6sltkntmd5jeoleizogdwnxe5c6lqy",
  SHABANI:  "bafybeiek2ffwfeu5und75kkdrwx66c3yahjfqb7whutgi5ygkxenmqzuaa",
  BIBI:     "bafybeiflaf6be6dnrf4ujuhxqozbuaexmuhtr7kqjerdfk6anr56bo6z3q",
  WIF:      "bafybeiflipwu3pe4wqqxkeezazkjrczsnroyksavjnokivqaiov6gk76gi",
  FU:       "bafybeigkyw4quomoqezda3g3upt672wowfhum6d7cpjrrv2uypqnik7rqi",
  HOBB:     "9E6u2yFx9wzMsEMBMRoLwaGVhBwzx2LoJWTtyeh8pump",
};

const IMG_EXT: Record<string, string> = {
  CAINYARF: "jpg", GAFJOOK: "jpg", ABFI: "jpg", CFRBY: "png", USDC: "png",
  "BRÖTCHEN": "png", SHABANI: "png", BIBI: "png", WIF: "png", FU: "png", HOBB: "webp",
};

function imgPath(name: string) {
  const key = TOKEN_MINTS[name];
  const ext = IMG_EXT[name];
  return `/token-imgs/${key}.${ext}`;
}

const BASE_PRICES: Record<string, number> = {
  CAINYARF: 3700, GAFJOOK: 284400, ABFI: 2400, CFRBY: 16000, USDC: 4300,
  "BRÖTCHEN": 1321000, SHABANI: 38800, BIBI: 780100, WIF: 1000, FU: 51900, HOBB: 420,
};

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

type TickerEntry = { name: string; price: number; prev: number };

export function TokenTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tickers, setTickers] = useState<TickerEntry[]>(
    Object.keys(BASE_PRICES).map(name => ({ name, price: BASE_PRICES[name], prev: BASE_PRICES[name] }))
  );

  useEffect(() => {
    // Try to fetch real prices from our API, fall back to random walk
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        const data = await res.json();
        if (data.prices) {
          setTickers(prev => prev.map(t => {
            const realPrice = data.prices[t.name];
            if (realPrice && realPrice > 0) {
              return { name: t.name, prev: t.price, price: realPrice };
            }
            // Random walk for tokens not in Jupiter API
            const next = t.price * (1 + (Math.random() - 0.5) * 0.03);
            return { name: t.name, prev: t.price, price: next };
          }));
          return;
        }
      } catch {
        // fall through to random walk
      }
      setTickers(prev => prev.map(t => {
        const next = t.price * (1 + (Math.random() - 0.5) * 0.03);
        return { name: t.name, prev: t.price, price: next };
      }));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 8000);
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
        {tickers.map(({ name, price, prev }) => {
          const up = price >= prev;
          return (
            <div key={name} className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="w-[22px] h-[22px] rounded-full overflow-hidden shrink-0 bg-gray-200">
                <Image src={imgPath(name)} alt={name} width={22} height={22} className="object-cover w-full h-full" />
              </div>
              <span className="text-[12px] font-medium text-gray-700">{name}</span>
              <span className={`text-[12px] font-semibold transition-colors ${up ? "text-green-600" : "text-red-500"}`}>
                {formatPrice(price)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
