import { Sidebar } from "@/components/core/sidebar";
import { FooterBar } from "@/components/core/footer-bar";
import { TokenTicker } from "@/components/core/token-ticker";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TokenTicker />
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}
