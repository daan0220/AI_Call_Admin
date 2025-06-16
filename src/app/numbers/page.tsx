"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { ClickableTableRow } from '@/components/ClickableTableRow';

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
  // ダミーのフォーム状態
  const [form] = useState({
    startDate: '2025-06-15',
    endDate: '2100-12-31',
    days: ['月', '火', '水', '木', '金'],
    startTime: '08:00',
    endTime: '19:00',
    scenarioIn: '代表電話取次ぎ（営業電話抑止）',
    scenarioOut: '折り返し専用(担当者、用件確認)',
  });
  const allDays = ['月', '火', '水', '木', '金', '土', '日', '祝'];
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>ID</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>ステータス</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>電話番号</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間内の動作</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>有効日</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間外の動作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((phone) => (
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
                      <DialogContent className="max-w-2xl rounded-xl p-0 overflow-hidden">
                        <DialogHeader className="bg-[#7C6CF6] px-6 py-4">
                          <DialogTitle className="text-white text-center text-lg">稼働時間設定</DialogTitle>
                        </DialogHeader>
                        <div className="px-8 py-8 bg-white">
                          <div className="mb-4 p-3 rounded bg-orange-50 text-orange-600 text-sm flex items-center gap-2">
                            <span className="text-xl">⚠️</span>
                            30日間の無料デモ利用AI電話番号では、セリフの変更やチャットとの連携を体験いただけます。転送機能をお試ししたいには、プランのご契約が必要です。
                          </div>
                          <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 items-center">
                              <label className="font-medium">稼働期間 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2">
                                <Input type="date" value={form.startDate} className="w-36" readOnly />
                                <span>〜</span>
                                <Input type="date" value={form.endDate} className="w-36" readOnly />
                              </div>
                              <label className="font-medium">有効日 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2 flex-wrap">
                                {allDays.map(day => (
                                  <Checkbox key={day} checked={form.days.includes(day)} disabled className="mr-1" />
                                ))}
                              </div>
                              <label className="font-medium">稼働時間 <span className="text-red-500">*</span></label>
                              <div className="flex gap-2 items-center">
                                <Input type="time" value={form.startTime} className="w-24" readOnly />
                                <span>〜</span>
                                <Input type="time" value={form.endTime} className="w-24" readOnly />
                              </div>
                              <label className="font-medium">稼働時間内の動作 <span className="text-red-500">*</span></label>
                              <Select value={form.scenarioIn}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="シナリオ" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="代表電話取次ぎ（営業電話抑止）">代表電話取次ぎ（営業電話抑止）</SelectItem>
                                  <SelectItem value="折り返し専用(担当者、用件確認)">折り返し専用(担当者、用件確認)</SelectItem>
                                </SelectContent>
                              </Select>
                              <label className="font-medium">稼働時間外の動作 <span className="text-red-500">*</span></label>
                              <Select value={form.scenarioOut}>
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
                              <DialogClose asChild>
                                <Button style={{ background: '#7C6CF6', color: '#fff', width: 200 }}>設定を反映する</Button>
                              </DialogClose>
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
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        AI電話番号
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="mb-4 text-base font-semibold" style={{ color: COLORS.primary }}>
          デモ利用中
        </div>
        <PhoneNumberTable data={phoneNumbers} />
      </Card>
    </div>
  );
} 