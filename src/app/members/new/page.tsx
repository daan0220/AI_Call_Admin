"use client";
import { useRouter } from "next/navigation";
import { MemberForm } from "@/components/members/MemberForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBER_DETAIL_TEXTS } from "@/constants/texts";

export default function MemberNewPage() {
  const router = useRouter();
  const handleSubmit = () => {
    // ここでAPI保存処理など
    router.push("/members");
  };
  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className="text-2xl font-bold" style={{ color: '#5B7FFF' }}>{MEMBER_DETAIL_TEXTS.newPageTitle}</h1>
      </div>
      <MemberForm submitLabel={MEMBER_DETAIL_TEXTS.addNew} onSubmit={handleSubmit} />
    </div>
  );
} 