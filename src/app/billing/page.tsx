'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from "next/link";
import { BILLING_LIST_TEXTS } from '@/constants/texts';

interface BillingTableProps {
  data: {
    id: string;
    month: string;
    amount: string;
    budget: string;
  }[];
}

function BillingTable({ data }: BillingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{BILLING_LIST_TEXTS.table.id}</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{BILLING_LIST_TEXTS.table.month}</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{BILLING_LIST_TEXTS.table.amount}</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{BILLING_LIST_TEXTS.table.budget}</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{BILLING_LIST_TEXTS.table.action}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((bill, index) => (
          <ClickableTableRow key={index} href={`/billing/${index + 1}`}>
            <TableCell className={TABLE_STYLES.cell}>{bill.id}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.month}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.amount}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.budget}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>
              <Link href={`/billing/${bill.id}`}>
                <Button
                  variant="outline"
                  className="text-xs"
                  style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                >
                  {BILLING_LIST_TEXTS.table.detail}
                </Button>
              </Link>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BillingPage() {
  const billingData = [
    {
      id: "1",
      month: "2025-07（06月利用分）",
      amount: "0（無料デモ）",
      budget: "1,000",
    },
  ];
  // 編集用state
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    company: '株式会社Pactom',
    email: 'daikisocceta1@gmail.com',
    cc: '',
    address: '〒1600023 東京都新宿区西新宿西新宿3丁目3番13号西新宿',
    phone: '08093702122',
  });
  // 請求対象詳細ダイアログstate
  const [targetDialogOpen, setTargetDialogOpen] = useState(false);
  // 仮データ
  const targetMembers = [
    { name: '安藤太紀', department: '経営部', time: '2025-06-15 23:04:59' },
  ];
  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        {BILLING_LIST_TEXTS.pageTitle}
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="block text-base font-semibold" style={{ color: COLORS.primary }}>
              {BILLING_LIST_TEXTS.latestInfo}
            </span>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button style={{ background: '#00CFFF', color: '#fff', fontWeight: 600 }}>{BILLING_LIST_TEXTS.edit}</Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{BILLING_LIST_TEXTS.editDialog.title}</DialogTitle>
                </DialogHeader>
                <div className="bg-[#FFF6E5] border border-[#F5C16C] rounded-md p-4 mb-4 text-[#E0942B] text-sm">
                  <span dangerouslySetInnerHTML={{__html: BILLING_LIST_TEXTS.editDialog.alert}} />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">{BILLING_LIST_TEXTS.editDialog.company}</label>
                    <Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">{BILLING_LIST_TEXTS.editDialog.email}<span className="text-red-500 ml-1">*</span></label>
                    <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">{BILLING_LIST_TEXTS.editDialog.cc}</label>
                    <Input value={form.cc} onChange={e => setForm(f => ({ ...f, cc: e.target.value }))} />
                    <span className="text-xs text-gray-400">※最大で2つまでご登録いただけます</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block font-semibold mb-1">郵便番号</label>
                      <Input value={form.address.slice(1,8)} onChange={e => setForm(f => ({ ...f, address: `〒${e.target.value} ${f.address.split(' ').slice(1).join(' ')}` }))} maxLength={7} />
                    </div>
                    <div className="flex-1 flex items-end">
                      <Button variant="outline" className="w-full">郵便番号から住所検索</Button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">都道府県・市区町村</label>
                    <Input value={form.address.split(' ').slice(1,2)[0] || ''} onChange={e => setForm(f => ({ ...f, address: `〒${f.address.slice(1,8)} ${e.target.value} ${f.address.split(' ').slice(2).join(' ')}` }))} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">丁目・番地・号・建物名・部屋番号<span className="text-red-500 ml-1">*</span></label>
                    <Input value={form.address.split(' ').slice(2).join(' ')} onChange={e => setForm(f => ({ ...f, address: `〒${f.address.slice(1,8)} ${f.address.split(' ').slice(1,2)[0] || ''} ${e.target.value}` }))} required />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">{BILLING_LIST_TEXTS.editDialog.phone}</label>
                    <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <DialogClose asChild>
                    <Button variant="outline">{BILLING_LIST_TEXTS.editDialog.cancel}</Button>
                  </DialogClose>
                  <Button style={{ background: COLORS.primary, color: '#fff' }} onClick={() => setEditOpen(false)}>{BILLING_LIST_TEXTS.editDialog.save}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table className="mb-4 text-base bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
            <TableBody>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold w-64">{BILLING_LIST_TEXTS.editDialog.company}</TableCell>
                <TableCell>{form.company}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">{BILLING_LIST_TEXTS.editDialog.email}</TableCell>
                <TableCell>{form.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">{BILLING_LIST_TEXTS.editDialog.cc}</TableCell>
                <TableCell>{form.cc}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">{BILLING_LIST_TEXTS.editDialog.address}</TableCell>
                <TableCell>{form.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">{BILLING_LIST_TEXTS.editDialog.phone}</TableCell>
                <TableCell>{form.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">当月現時点の社員名簿の請求対象</TableCell>
                <TableCell>1 
                  <Dialog open={targetDialogOpen} onOpenChange={setTargetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="ml-2 text-xs" style={{ background: COLORS.primary }}>{BILLING_LIST_TEXTS.targetDetail}</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0">
                      <DialogHeader className="bg-[#7C6CF6] px-8 py-4 rounded-t-lg">
                        <DialogTitle className="text-white text-lg text-center">{BILLING_LIST_TEXTS.targetDialog.title}</DialogTitle>
                      </DialogHeader>
                      <div className="px-8 py-8 bg-white rounded-b-lg">
                        <Table className="w-full text-base">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="bg-[#F5F6FB] text-[#3B3172] text-base font-semibold">{BILLING_LIST_TEXTS.memberTable.name}</TableHead>
                              <TableHead className="bg-[#F5F6FB] text-[#3B3172] text-base font-semibold">{BILLING_LIST_TEXTS.memberTable.department}</TableHead>
                              <TableHead className="bg-[#F5F6FB] text-[#3B3172] text-base font-semibold">{BILLING_LIST_TEXTS.memberTable.time}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {targetMembers.map((m, i) => (
                              <TableRow key={i}>
                                <TableCell className="text-center">{m.name}</TableCell>
                                <TableCell className="text-center">{m.department}</TableCell>
                                <TableCell className="text-center">{m.time}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">当月現時点のSMS配信通数</TableCell>
                <TableCell>0通</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F6FB] font-semibold">現時点の従量課金予算上限<br /><span className='text-xs text-[#E94B4B] font-normal'>※予算上限の設定はAI会話料のみが対象となります</span></TableCell>
                <TableCell>1,000円（税抜）</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mb-6">
          <BillingTable data={billingData} />
        </div>
      </Card>
    </div>
  );
} 