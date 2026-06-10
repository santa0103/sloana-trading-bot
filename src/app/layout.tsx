import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Svarog Bot",
  description: "Solana bundler dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
