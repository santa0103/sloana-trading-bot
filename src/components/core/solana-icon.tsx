export function SolanaIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.1 93.6a3.6 3.6 0 0 1 2.5-1h98.8c1.6 0 2.4 1.9 1.3 3l-20.8 20.8a3.6 3.6 0 0 1-2.5 1H1.6c-1.6 0-2.4-1.9-1.3-3L21.1 93.6z"
        fill="url(#sol-a)"
      />
      <path
        d="M21.1 11.6A3.7 3.7 0 0 1 23.6 10.6h98.8c1.6 0 2.4 1.9 1.3 3L102.9 34.4a3.6 3.6 0 0 1-2.5 1H1.6c-1.6 0-2.4-1.9-1.3-3L21.1 11.6z"
        fill="url(#sol-b)"
      />
      <path
        d="M102.9 52.4a3.6 3.6 0 0 0-2.5-1H1.6c-1.6 0-2.4 1.9-1.3 3l20.8 20.8a3.6 3.6 0 0 0 2.5 1h98.8c1.6 0 2.4-1.9 1.3-3L102.9 52.4z"
        fill="url(#sol-c)"
      />
      <defs>
        <linearGradient id="sol-a" x1="0" y1="64" x2="128" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
        <linearGradient id="sol-b" x1="0" y1="64" x2="128" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
        <linearGradient id="sol-c" x1="0" y1="64" x2="128" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
    </svg>
  );
}
