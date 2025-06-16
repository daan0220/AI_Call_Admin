"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { COLORS } from "@/constants/styles";
import Footer from '@/components/footer';

const inter = Inter({ subsets: ["latin"] });

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
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
