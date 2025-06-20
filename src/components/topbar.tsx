"use client";

import { Bell, ChevronDown, User, LogOut, PenLine, Mail, MessageSquare } from "lucide-react";
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
import { TOPBAR_TEXTS } from '@/constants/texts';

export function Topbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 h-14 px-4" style={{ background: '#EEF4FF', borderBottom: '1px solid #D6E2FF' }}>
      <div className="flex h-full items-center justify-end">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 mr-2">
            <Button variant="outline" className="border-[#5B7FFF] text-[#5B7FFF] font-normal rounded-full px-4 py-1.5 text-sm flex items-center gap-1 hover:bg-[#F5F6FB]" style={{ borderWidth: 2, background: 'transparent' }}>
              <PenLine className="w-3.5 h-3.5" /> {TOPBAR_TEXTS.feedback}
            </Button>
            <Button variant="outline" className="border-[#5B7FFF] text-[#5B7FFF] font-normal rounded-full px-4 py-1.5 text-sm flex items-center gap-1 hover:bg-[#F5F6FB]" style={{ borderWidth: 2, background: 'transparent' }}>
              <Mail className="w-3.5 h-3.5" /> {TOPBAR_TEXTS.contact}
            </Button>
            <Button variant="outline" className="border-[#5B7FFF] text-[#5B7FFF] font-normal rounded-full px-4 py-1.5 text-sm flex items-center gap-1 hover:bg-[#F5F6FB]" style={{ borderWidth: 2, background: 'transparent' }}>
              <MessageSquare className="w-3.5 h-3.5" /> {TOPBAR_TEXTS.faq}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" style={{ color: '#5B7FFF' }}>
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#5B7FFF]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="px-4 py-2 text-sm font-semibold text-[#5B7FFF]">{TOPBAR_TEXTS.notification}</div>
              {TOPBAR_TEXTS.notifications.map((notice, i) => (
                <DropdownMenuItem className="text-sm text-gray-700" key={i}>
                  {notice}
                </DropdownMenuItem>
              ))}
              <div className="px-4 py-2 text-xs text-gray-400">{TOPBAR_TEXTS.seeAll}</div>
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
                <span className="font-semibold text-[#222] text-base">{TOPBAR_TEXTS.user}</span>
                <ChevronDown className="h-5 w-5 text-[#5B7FFF]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="text-base text-[#5B7FFF] gap-2" onClick={() => router.push("/members/2981") }>
                <User className="h-5 w-5" /> {TOPBAR_TEXTS.profile}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base text-[#5B7FFF] gap-2">
                <LogOut className="h-5 w-5" /> {TOPBAR_TEXTS.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 