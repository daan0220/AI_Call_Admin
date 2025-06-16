"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Home,
  Phone,
  Workflow,
  Users,
  Contact,
  Calendar,
  History,
  CreditCard,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useSidebarTransition } from "@/contexts/TransitionContext";

export type MenuItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const defaultMenuItems: MenuItem[] = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/numbers", label: "AI電話番号", icon: Phone },
  { href: "/scenarios", label: "シナリオ", icon: Workflow },
  { href: "/members", label: "社員名簿", icon: Users },
  { href: "/externals", label: "社外名簿", icon: Contact },
  { href: "/holidays", label: "祝日一覧", icon: Calendar },
  { href: "/logs", label: "通話履歴", icon: History },
  { href: "/billing", label: "ご請求", icon: CreditCard },
  { href: "/settings", label: "設定", icon: Settings },
];

interface SidebarProps {
  menuItems?: MenuItem[];
}

export function Sidebar({ menuItems = defaultMenuItems }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { setSidebarTransition } = useSidebarTransition();

  const NavContent = () => (
    <ScrollArea className="h-full py-1">
      <nav className="grid gap-3 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarTransition(true)}
              className={cn(
                "flex items-center gap-5 rounded-lg px-4 py-4 text-base font-bold transition-all font-sans",
                collapsed ? "justify-center px-2" : "",
                isActive
                  ? "bg-gradient-to-r from-[#5B7FFF] to-[#7C8BFF] text-[#F5F7FA] shadow-lg"
                  : "hover:bg-[#EEF4FF] hover:text-[#5B7FFF] text-[#6B687A]"
              )}
              style={isActive ? {
                boxShadow: "0 4px 24px 0 #7C8BFF44",
                letterSpacing: '0.04em',
                fontWeight: 700,
                fontFamily: '"Noto Sans JP", "Meiryo", sans-serif',
                filter: 'drop-shadow(0 2px 8px #7C8BFF33)'
              } : {
                letterSpacing: '0.04em',
                fontWeight: 700,
                fontFamily: '"Noto Sans JP", "Meiryo", sans-serif'
              }}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );

  return (
    <>
      {/* モバイル用シート */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[264px] p-0" style={{ background: '#EEF4FF' }}>
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* デスクトップ用固定サイドバー */}
      <aside
        className={
          `hidden md:flex flex-col border-r h-screen transition-all duration-300 ${collapsed ? 'w-[64px]' : 'w-[264px]'}`
        }
        style={{ background: '#EEF4FF' }}
      >
        {/* ロゴ＋テキスト＋折りたたみボタン */}
        <div className={`flex items-center justify-between px-4 py-2 ${collapsed ? 'justify-center' : ''}`}
             style={{ minHeight: 40 }}>
          <div className={`flex items-center gap-2 transition-all ${collapsed ? 'justify-center w-full' : ''}`}>
            {/* ロゴ画像削除、テキストのみ */}
            {!collapsed && (
              <span className="text-xl font-bold select-none">
                AI 電話番
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`ml-2 transition-all ${collapsed ? '' : ''}`}
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? '展開' : '折りたたみ'}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1">
          <NavContent />
        </div>
      </aside>
    </>
  );
} 