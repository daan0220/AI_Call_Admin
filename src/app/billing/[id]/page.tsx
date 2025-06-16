"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BillingDetailPage() {
  const router = useRouter();
  // ダミーデータ
  const bill = {
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
  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/billing">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
          </Button>
        </Link>
        <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>{bill.title}</span>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="mb-6">
          <div className="flex gap-8 mb-2">
            <div>
              <div className="font-semibold mb-1">6月の社員名簿の利用状況</div>
              <div className="flex items-center gap-2">
                <span>{bill.memberCount}人（請求対象：{bill.targetCount}人）</span>
                <button className="border border-[#5B7FFF] text-[#5B7FFF] rounded px-2 py-1 text-xs font-semibold">請求対象詳細</button>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">6月の従量課金予算上限</div>
              <span>※予算上限の設定はAI会話料のみが対象となります</span><br />
              <span className="text-[#E94B4B] text-xs">* 予算上限の設定はAI会話料のみが対象となります</span><br />
              <span className="font-bold text-lg">{bill.budget}</span>
            </div>
          </div>
        </div>
        <Table className="mb-4 text-base bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">利用状態</TableHead>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">明細</TableHead>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">数量</TableHead>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">単位</TableHead>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">単価（円）</TableHead>
              <TableHead className="bg-[#5B7FFF] text-white font-semibold">金額（円）</TableHead>
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
              <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">小計</TableCell>
              <TableCell className="bg-[#F5F6FB] font-semibold">{bill.subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">消費税</TableCell>
              <TableCell className="bg-[#F5F6FB] font-semibold">{bill.tax}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="bg-[#F5F6FB] text-right font-semibold">合計</TableCell>
              <TableCell className="bg-[#F5F6FB] font-semibold">{bill.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 