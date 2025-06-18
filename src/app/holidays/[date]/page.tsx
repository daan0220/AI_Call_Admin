"use client";
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { COLORS, LAYOUT_STYLES, TABLE_STYLES } from '@/constants/styles';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { useState } from 'react';
import { EntityDetailActions } from '@/components/common/EntityDetailActions';
import { DeleteEntityDialog } from '@/components/common/DeleteEntityDialog';
import { HolidayDetailTable, HolidayDetail } from '@/components/holidays/HolidayDetailTable';
import { HOLIDAY_TEXTS } from '@/constants/texts';

export default function HolidayDetailPage() {
  const router = useRouter();
  const params = useParams();
  const date = decodeURIComponent(params.date as string);
  // 仮データ（本来はAPI取得）
  const [holiday] = useState<HolidayDetail>({
    name: '海の日',
    date: '2025-07-21',
    dayOfWeek: '月',
    note: '',
    createdAt: '2025-06-15 23:04:59',
    updatedAt: '2025-06-15 23:04:59',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 編集ボタン押下時
  const handleEdit = () => {
    router.push(`/holidays/${holiday.date}/edit`);
  };
  // 削除ボタン押下時
  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };
  // 削除確定時
  const handleDeleteConfirm = () => {
    // TODO: 削除API呼び出しやリスト更新処理
    setDeleteDialogOpen(false);
    router.back();
  };

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>{HOLIDAY_TEXTS.detailPageTitle}</h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#6B687A]">{HOLIDAY_TEXTS.basicSettings}</h2>
          <EntityDetailActions onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <HolidayDetailTable holiday={holiday} />
        <DeleteEntityDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} entityName={holiday.name} onDelete={handleDeleteConfirm} onCancel={() => setDeleteDialogOpen(false)} />
      </Card>
    </div>
  );
} 