"use client";
import { useRouter } from "next/navigation";
import { ExternalContactForm } from "@/components/externals/ExternalContactForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { EXTERNAL_EDIT_TEXTS } from '@/constants/texts';

export default function ExternalNewPage() {
  const router = useRouter();
  const handleSubmit = () => {
    // ここでAPI保存処理など
    router.push("/externals");
  };
  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>{EXTERNAL_EDIT_TEXTS.newPageTitle}</h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <ExternalContactForm submitLabel={EXTERNAL_EDIT_TEXTS.addNew} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
} 