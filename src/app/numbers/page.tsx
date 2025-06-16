"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PhoneNumber {
  id: string;
  status: string;
  number: string;
  businessHoursAction: {
    scenario: string;
    canChange: boolean;
  };
  validPeriod: {
    start: string;
    end: string;
  };
  businessHours: {
    days: string;
    time: string;
  };
  afterHoursAction: string;
}

interface PhoneNumberTableProps {
  data: PhoneNumber[];
}

function PhoneNumberTable({ data }: PhoneNumberTableProps) {
  const [open, setOpen] = useState(false);
  // 編集用フォームstate
  const [form, setForm] = useState({
    mode: '稼働時間設定',
    startDate: '2025-06-15',
    endDate: '2100-12-31',
    days: ['月', '火', '水', '木', '金'],
    startTime: '08:00',
    endTime: '19:00',
    scenarioIn: '代表電話取次ぎ（営業電話抑止）',
    scenarioOut: '折り返し専用(担当者、用件確認)',
  });
  const allDays = ['月', '火', '水', '木', '金', '土', '日', '祝'];
  // テーブル反映用state
  const [tableData, setTableData] = useState(data);
  // 保存処理
  const handleSave = () => {
    setTableData(prev => prev.map(row => ({
      ...row,
      businessHoursAction: { ...row.businessHoursAction, scenario: form.scenarioIn },
      validPeriod: { start: form.startDate, end: form.endDate },
      businessHours: { days: form.days.join(''), time: `${form.startTime}〜${form.endTime}` },
      afterHoursAction: form.scenarioOut,
    })));
    setOpen(false);
  };
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">ID</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">ステータス</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">電話番号</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">営業時間内の動作</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">有効日</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">営業時間</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">営業時間外の動作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((phone) => (
            <ClickableTableRow key={phone.id} href={`/numbers/${phone.id}`}>
              <TableCell className={TABLE_STYLES.cell}>{phone.id}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                >
                  {phone.status}
                </Badge>
              </TableCell>
              <TableCell className={TABLE_STYLES.cell}>{phone.number}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                <div className="flex items-center justify-center gap-2">
                  <span>{phone.businessHoursAction.scenario}</span>
                  {phone.businessHoursAction.canChange && (
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="text-xs"
                          style={{ background: COLORS.primary }}
                          onClick={e => e.stopPropagation()}
                        >
                          変更
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-xl p-0 overflow-hidden" data-no-row-link>
                        <DialogHeader className="bg-[#7C6CF6] px-6 py-4">
                          <DialogTitle className="text-white text-center text-lg">稼働時間設定</DialogTitle>
                        </DialogHeader>
                        <div className="px-8 py-8 bg-white">
                          <div className="mb-4 p-3 rounded bg-orange-50 text-orange-600 text-sm flex items-center gap-2">
                            <span className="text-xl">⚠️</span>
                            30日間の無料デモ用AI電話番号では、セリフの変更やチャットとの連携を体験いただけます。転送機能をお試ししたいには、プランのご契約が必要です。
                          </div>
                          <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                            <div className="flex gap-8 mb-4">
                              <RadioGroup value={form.mode} onValueChange={v => setForm(f => ({ ...f, mode: v }))} className="flex gap-8">
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="24時間稼働" id="mode-24" />
                                  <label htmlFor="mode-24" className="font-medium">24時間稼働</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <RadioGroupItem value="稼働時間設定" id="mode-custom" />
                                  <label htmlFor="mode-custom" className="font-medium">稼働時間設定</label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="grid grid-cols-2 gap-4 items-center bg-[#F5F6FB] p-4 rounded-xl">
                              <label className="font-medium">稼働時期 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2">
                                <Input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-36" required />
                                <span>〜</span>
                                <Input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="w-36" required />
                              </div>
                              <label className="font-medium">有効日 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2 flex-wrap">
                                {allDays.map(day => (
                                  <label key={day} className="flex items-center gap-1">
                                    <Checkbox checked={form.days.includes(day)} onCheckedChange={checked => setForm(f => ({ ...f, days: checked ? [...f.days, day] : f.days.filter(d => d !== day) }))} />
                                    <span>{day}</span>
                                  </label>
                                ))}
                              </div>
                              <label className="font-medium">稼働時間 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2 items-center">
                                <Input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} className="w-24" required />
                                <span>〜</span>
                                <Input type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} className="w-24" required />
                              </div>
                              <label className="font-medium">稼働時間内の動作 <span className="text-red-500">*</span></label>
                              <Select value={form.scenarioIn} onValueChange={v => setForm(f => ({ ...f, scenarioIn: v }))}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="シナリオ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="代表電話取次ぎ（営業電話抑止）">代表電話取次ぎ（営業電話抑止）</SelectItem>
                                  <SelectItem value="折り返し専用(担当者、用件確認)">折り返し専用(担当者、用件確認)</SelectItem>
                                </SelectContent>
                              </Select>
                              <label className="font-medium">稼働時間外の動作 <span className="text-red-500">*</span></label>
                              <Select value={form.scenarioOut} onValueChange={v => setForm(f => ({ ...f, scenarioOut: v }))}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="シナリオ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="代表電話取次ぎ（営業電話抑止）">代表電話取次ぎ（営業電話抑止）</SelectItem>
                                  <SelectItem value="折り返し専用(担当者、用件確認)">折り返し専用(担当者、用件確認)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-center mt-8">
                              <Button type="submit" style={{ background: '#7C6CF6', color: '#fff', width: 200 }}>設定を反映する</Button>
                            </div>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                {phone.validPeriod.start}
                <br />
                〜{phone.validPeriod.end}
              </TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                {phone.businessHours.days}
                <br />
                {phone.businessHours.time}
              </TableCell>
              <TableCell className={TABLE_STYLES.cell}>{phone.afterHoursAction}</TableCell>
            </ClickableTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function NumbersPage() {
  const phoneNumbers: PhoneNumber[] = [
    {
      id: "187",
      status: "デモ利用中",
      number: "05053690814",
      businessHoursAction: {
        scenario: "代表電話取次ぎ（営業電話抑止）",
        canChange: true,
      },
      validPeriod: {
        start: "2025-06-15",
        end: "2100-12-31",
      },
      businessHours: {
        days: "月火水木金",
        time: "08:00〜19:00",
      },
      afterHoursAction: "折り返し専用(担当者、用件確認)",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        AI電話番号
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="mb-4 text-base font-semibold" style={{ color: COLORS.primary }}>
          デモ利用中
        </div>
        <PhoneNumberTable data={phoneNumbers} />
      </Card>
    </div>
  );
} 