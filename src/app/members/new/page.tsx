"use client";
import { useRouter } from "next/navigation";
import { MemberForm } from "@/components/members/MemberForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <h1 className="text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿新規</h1>
      </div>
      <MemberForm submitLabel="新規ユーザーにメール送信し追加する" onSubmit={handleSubmit} />
    </div>
  );
} 