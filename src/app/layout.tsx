import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { COLORS } from "@/constants/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 電話番管理画面",
  description: "AI電話自動対応サービスの管理画面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} style={{ background: COLORS.background }}>
        <div className="flex h-screen" style={{ background: COLORS.background }}>
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
