"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface CallLog {
  timestamp: string;
  type: string;
  from: string;
  to: string;
  aiNumber: string;
  scenario: string;
  result: string;
  operation: string;
  recording: string;
  status: string;
}


export default function LogsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [timeFrom, setTimeFrom] = useState("00:00");
  const [timeTo, setTimeTo] = useState("23:59");
  const callLogs: CallLog[] = [
    {
      timestamp: "-",
      type: "-",
      from: "-",
      to: "-",
      aiNumber: "-",
      scenario: "-",
      result: "-",
      operation: "-",
      recording: "-",
      status: "-",
    },
  ];
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchForm, setSearchForm] = useState({
    type: '',
    from: '',
    to: '',
    result: '',
  });

  const hasData = callLogs.length > 0 && !(callLogs.length === 1 && callLogs[0].aiNumber === "-");

  // プリセット
  const presets = [
    { label: "今日", get: () => { const d = new Date(); return { from: d, to: d }; } },
    { label: "昨日", get: () => { const d = new Date(); d.setDate(d.getDate() - 1); return { from: d, to: d }; } },
    { label: "今月", get: () => { const d = new Date(); return { from: new Date(d.getFullYear(), d.getMonth(), 1), to: new Date(d.getFullYear(), d.getMonth() + 1, 0) }; } },
    { label: "90日", get: () => { const d = new Date(); return { from: addDays(d, -89), to: d }; } },
    { label: "先月", get: () => { const d = new Date(); return { from: new Date(d.getFullYear(), d.getMonth() - 1, 1), to: new Date(d.getFullYear(), d.getMonth(), 0) }; } },
  ];

  // 日付＋時刻を文字列に
  function formatRange(range: { from?: Date; to?: Date }, timeFrom: string, timeTo: string) {
    if (!range.from || !range.to) return "";
    return `${format(range.from, "yyyy-MM-dd")} ${timeFrom} ~ ${format(range.to, "yyyy-MM-dd")} ${timeTo}`;
  }

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        通話履歴
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Input
                type="text"
                className="w-64 cursor-pointer"
                readOnly
                value={formatRange(dateRange ?? {}, timeFrom, timeTo)}
                onClick={() => setPopoverOpen(true)}
                style={{ borderColor: COLORS.border }}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <div className="flex border-b">
                <div className="flex flex-col w-24 border-r">
                  {presets.map(preset => (
                    <button
                      key={preset.label}
                      className="py-2 px-3 text-sm hover:bg-[#F5F6FB] text-left"
                      onClick={() => {
                        const range = preset.get();
                        setDateRange(range);
                        setTimeFrom("00:00");
                        setTimeTo("23:59");
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <div className="p-4">
                  <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={dateRange}
                    onSelect={setDateRange}
                    captionLayout="dropdown"
                  />
                  <div className="flex gap-2 mt-2 justify-center">
                    <input
                      type="time"
                      value={timeFrom}
                      onChange={e => setTimeFrom(e.target.value)}
                      className="border rounded px-2 py-1 w-20"
                    />
                    <span>〜</span>
                    <input
                      type="time"
                      value={timeTo}
                      onChange={e => setTimeTo(e.target.value)}
                      className="border rounded px-2 py-1 w-20"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDateRange(undefined);
                        setTimeFrom("00:00");
                        setTimeTo("23:59");
                      }}
                    >クリア</Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setPopoverOpen(false);
                      }}
                      disabled={!dateRange?.from || !dateRange?.to}
                    >確定</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="全てのAI番号" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全てのAI番号</SelectItem>
              <SelectItem value="05053690814">05053690814</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="font-bold"
            disabled={!hasData}
            style={{
              background: !hasData ? '#EDF3FF' : '#5B7FFF',
              color: !hasData ? '#B5C8F6' : '#fff',
              border: 'none',
              boxShadow: 'none',
              opacity: 1,
            }}
          >
            ダウンロード(最大5000件)
          </Button>
          <div className="flex-1" />
          <Input placeholder="キーワード" className="w-48" style={{ borderColor: COLORS.border }} />
          <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-[#5B7FFF] underline">詳細検索</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>詳細検索</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 px-2 py-2">
                <div>
                  <label className="block mb-1">通話タイプ</label>
                  <Select value={searchForm.type} onValueChange={v => setSearchForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全て</SelectItem>
                      <SelectItem value="着信">着信</SelectItem>
                      <SelectItem value="発信">発信</SelectItem>
                      <SelectItem value="内線">内線</SelectItem>
                      <SelectItem value="外線">外線</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1">発信元</label>
                  <Input value={searchForm.from} onChange={e => setSearchForm(f => ({ ...f, from: e.target.value }))} />
                </div>
                <div>
                  <label className="block mb-1">着信先</label>
                  <Input value={searchForm.to} onChange={e => setSearchForm(f => ({ ...f, to: e.target.value }))} />
                </div>
                <div>
                  <label className="block mb-1">通話結果</label>
                  <Select value={searchForm.result} onValueChange={v => setSearchForm(f => ({ ...f, result: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全て</SelectItem>
                      <SelectItem value="顧客切断">顧客切断</SelectItem>
                      <SelectItem value="終話">終話</SelectItem>
                      <SelectItem value="折り返し必要">折り返し必要</SelectItem>
                      <SelectItem value="留守電あり">留守電あり</SelectItem>
                      <SelectItem value="取次完了">取次完了</SelectItem>
                      <SelectItem value="留守電あり(予算上限超過)">留守電あり(予算上限超過)</SelectItem>
                      <SelectItem value="留守電あり(シナリオ紐づいてない)">留守電あり(シナリオ紐づいてない)</SelectItem>
                      <SelectItem value="不在着信">不在着信</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <Button type="button" variant="outline" onClick={() => setSearchForm({ type: '', from: '', to: '', result: '' })}>クリア</Button>
                  <Button type="submit" style={{ background: '#7C6CF6', color: '#fff' }}>検索</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">発着信時間</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">通話タイプ</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">発信元</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">着信先</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">AI電話番号</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">関連シナリオ</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">通話結果</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">録音</TableHead>
                <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">処理状況</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {callLogs.map((log, index) => (
                <ClickableTableRow key={index} href={`/logs/${index + 1}`}>
                  <TableCell className={TABLE_STYLES.cell}>{log.aiNumber}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.timestamp}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.type}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.from}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.to}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.scenario}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.result}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.operation || '-'}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.recording || '-'}</TableCell>
                  <TableCell className={TABLE_STYLES.cell}>{log.status || '-'}</TableCell>
                </ClickableTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 