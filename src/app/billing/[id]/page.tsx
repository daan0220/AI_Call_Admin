"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EntityDetailActions } from '@/components/common/EntityDetailActions';
import { DeleteEntityDialog } from '@/components/common/DeleteEntityDialog';
import { useState } from 'react';
import { BILLING_TEXTS } from '@/constants/texts';

function BillingDetailTable({ bill }: { bill: typeof billData }) {
  return (
    <Table className="mb-4 text-base bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.usage}</TableHead>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.detail}</TableHead>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.qty}</TableHead>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.unit}</TableHead>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.price}</TableHead>
          <TableHead className="bg-[#5B7FFF] text-white font-semibold">{BILLING_TEXTS.table.amount}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bill.rows.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="text-[#6B687A]">{i === 0 ? "" : i === 3 ? "デモ期間" : ""}</TableCell>
            <TableCell>{row.label}</TableCell>
            <TableCell>{row.qty}</TableCell>
            <TableCell>{row.unit}</TableCell>
            <TableCell>{row.price.toLocaleString()}</TableCell>
            <TableCell>{row.amount.toLocaleString()}</TableCell>
          </TableRow>
        ))}
        {/* 小計・消費税・合計 */}
        <TableRow>
          <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">{BILLING_TEXTS.table.subtotal}</TableCell>
          <TableCell className="bg-[#F5F6FB] font-semibold">{bill.subtotal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">{BILLING_TEXTS.table.tax}</TableCell>
          <TableCell className="bg-[#F5F6FB] font-semibold">{bill.tax}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">{BILLING_TEXTS.table.total}</TableCell>
          <TableCell className="bg-[#F5F6FB] font-semibold">{bill.total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const billData = {
  title: "ご請求：2025-07（06月利用分）",
  status: "6月の社員名簿の利用状況",
  memberCount: 1,
  targetCount: 0,
  budget: "1,000円（税抜）",
  rows: [
    { label: "BASICプラン初期費用", qty: 1, unit: "個", price: 0, amount: 0 },
    { label: "BASICプラン月額費用", qty: 1, unit: "個", price: 4980, amount: 4980 },
    { label: "社員名簿のご利用人数分", qty: 1, unit: "個", price: 300, amount: 300 },
    { label: "電話番号(05053690814)月額基本費用", qty: 1, unit: "個", price: 500, amount: 500 },
    { label: "電話番号(05053690814)AI会話料（AI会話時間料）", qty: 0, unit: "分", price: 16, amount: 0 },
    { label: "電話番号(05053690814)SMS配信料", qty: 0, unit: "通", price: 10, amount: 0 },
    { label: "デモ利用料割引額", qty: 1, unit: "-", price: -5780, amount: -5780 },
  ],
  subtotal: 0,
  tax: 0,
  total: 0,
};

export default function BillingDetailPage() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleEdit = () => {/* 編集ページ遷移 */};
  const handleDelete = () => setDeleteDialogOpen(true);
  const handleDeleteConfirm = () => { setDeleteDialogOpen(false); router.back(); };
  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/billing">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
          </Button>
        </Link>
        <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>{BILLING_TEXTS.title}</span>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-8 mb-2">
            <div>
              <div className="font-semibold mb-1">{BILLING_TEXTS.status}</div>
              <div className="flex items-center gap-2">
                <span>{billData.memberCount}{BILLING_TEXTS.memberCountLabel}{billData.targetCount}{BILLING_TEXTS.targetCountLabel}</span>
                <button className="border border-[#5B7FFF] text-[#5B7FFF] rounded px-2 py-1 text-xs font-semibold">{BILLING_TEXTS.detailButton}</button>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">{BILLING_TEXTS.budgetTitle}</div>
              <span>{BILLING_TEXTS.budgetNote}</span><br />
              <span className="text-[#E94B4B] text-xs">{BILLING_TEXTS.budgetWarning}</span><br />
              <span className="font-bold text-lg">{billData.budget}</span>
            </div>
          </div>
          <EntityDetailActions onEdit={handleEdit} onDelete={handleDelete} editLabel={BILLING_TEXTS.edit} deleteLabel={BILLING_TEXTS.delete} />
        </div>
        <BillingDetailTable bill={billData} />
        <DeleteEntityDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} entityName={BILLING_TEXTS.title} onDelete={handleDeleteConfirm} onCancel={() => setDeleteDialogOpen(false)} />
      </Card>
    </div>
  );
} 