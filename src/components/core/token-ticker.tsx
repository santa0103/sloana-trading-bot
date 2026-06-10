"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useRef } from "react";

// Static token data — extend this list as new tokens are added
const tokens = [
  { name: "CAINYARF", price: "$3.7K", img: "/token-imgs/bafybeiagmzymketzq35xc5ls36ioa2tuxaclz5brwzv7z3x74x3lval7m4.jpg" },
  { name: "GAFJOOK", price: "$284.4K", img: "/token-imgs/bafkreiaivsgzxur2d4sjbwxajyv6frmx2xgbij2wd6ypogkhtlzswmemhi.jpg" },
  { name: "ABFI", price: "$2.4K", img: "/token-imgs/bafybeid3uv6mbvunbeqojiwkphrtsrh33mi3oxszlx2ig4p23xj7js4gd4.jpg" },
  { name: "CFRBY", price: "$16K", img: "/token-imgs/bafybeid6dsofb5ufmsqsbdtga5zywb7yqeee2xblbxnzozsp4ob6booqly.png" },
  { name: "USDC", price: "$4.3K", img: "/token-imgs/bafybeidcwp45v63pjipe4avaeez6pkbqxr737yb4eogmzn5tk43x2iegj4.png" },
  { name: "BRÖTCHEN", price: "$1321K", img: "/token-imgs/bafybeidr7nt5fhusgd6exusjbeew6sltkntmd5jeoleizogdwnxe5c6lqy.png" },
  { name: "SHABANI", price: "$38.8K", img: "/token-imgs/bafybeiek2ffwfeu5und75kkdrwx66c3yahjfqb7whutgi5ygkxenmqzuaa.png" },
  { name: "BIBI", price: "$780.1K", img: "/token-imgs/bafybeiflaf6be6dnrf4ujuhxqozbuaexmuhtr7kqjerdfk6anr56bo6z3q.png" },
  { name: "WIF", price: "$1.0K", img: "/token-imgs/bafybeiflipwu3pe4wqqxkeezazkjrczsnroyksavjnokivqaiov6gk76gi.png" },
  { name: "FU", price: "$51.9K", img: "/token-imgs/bafybeigkyw4quomoqezda3g3upt672wowfhum6d7cpjrrv2uypqnik7rqi.png" },
  { name: "HOBB", price: "$???", img: "/token-imgs/9E6u2yFx9wzMsEMBMRoLwaGVhBwzx2LoJWTtyeh8pump.webp" },
];

export function TokenTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 h-9 flex items-center">
      {/* Label */}
      <div className="shrink-0 px-3 border-r border-gray-200 h-full flex items-center">
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Trending</span>
      </div>

      {/* Scrollable tokens */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-center gap-1 overflow-x-auto flex-1 px-2 h-full token-ticker"
        style={{ scrollbarWidth: "none" }}
      >
        {tokens.map((token) => (
          <div
            key={token.name}
            className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer group transition-colors"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-gray-200">
              <Image src={token.img} alt={token.name} width={20} height={20} className="object-cover w-full h-full" />
            </div>
            <span className="text-[11px] font-medium text-gray-700">{token.name}</span>
            <span className="text-[11px] text-green-600 font-semibold">{token.price}</span>
          </div>
        ))}
      </div>

      {/* Close */}
      <button className="shrink-0 px-3 h-full flex items-center border-l border-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
