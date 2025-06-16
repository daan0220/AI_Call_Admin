"use client";

import { Bell, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function Topbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 h-14 px-4" style={{ background: '#EEF4FF', borderBottom: '1px solid #D6E2FF' }}>
      <div className="flex h-full items-center justify-end">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" style={{ color: '#5B7FFF' }}>
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#5B7FFF]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="px-4 py-2 text-sm font-semibold text-[#5B7FFF]">通知</div>
              <DropdownMenuItem className="text-sm text-gray-700">
                2024/06/15　新機能「シナリオ複製」リリース！
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-700">
                2024/06/10　UIデザインをリニューアルしました。
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-gray-700">
                2024/06/01　AI電話番号の利用状況がグラフで見られるようになりました。
              </DropdownMenuItem>
              <div className="px-4 py-2 text-xs text-gray-400">すべての通知を見る</div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 py-1">
                <Avatar style={{ background: '#5B7FFF', width: 32, height: 32 }}>
                  <AvatarFallback style={{ background: '#5B7FFF', color: '#fff' }}>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-[#222] text-base">安藤　太紀様</span>
                <ChevronDown className="h-5 w-5 text-[#5B7FFF]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="text-base text-[#5B7FFF] gap-2" onClick={() => router.push("/members/2981") }>
                <User className="h-5 w-5" /> プロフィール
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base text-[#5B7FFF] gap-2">
                <LogOut className="h-5 w-5" /> ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 