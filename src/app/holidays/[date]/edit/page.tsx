"use client";
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { COLORS, LAYOUT_STYLES } from '@/constants/styles';
import { HolidayEditTable, HolidayEditForm } from '@/components/holidays/HolidayEditTable';
import { HOLIDAY_TEXTS } from '@/constants/texts';

export default function HolidayEditPage() {
  const router = useRouter();
  const params = useParams();
  const date = decodeURIComponent(params.date as string);
  // 仮データ（本来はAPI取得）
  const [form, setForm] = useState<HolidayEditForm>({
    name: '',
    date: date,
    note: '',
  });

  // 保存処理（仮）
  const handleSave = () => {
    // 保存API呼び出しなど
    alert('保存しました');
    router.back();
  };

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>{HOLIDAY_TEXTS.editPageTitle}</h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <h2 className="text-xl font-bold mb-6 text-[#6B687A]">{HOLIDAY_TEXTS.basicSettings}</h2>
        <form>
          <HolidayEditTable form={form} onChange={setForm} />
          <div className="flex justify-center py-8">
            <Button type="button" style={{ background: '#22C55E', color: '#fff', width: 240, fontWeight: 700 }} onClick={handleSave}>
              {HOLIDAY_TEXTS.save}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 