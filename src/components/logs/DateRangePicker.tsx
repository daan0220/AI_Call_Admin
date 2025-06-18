"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { COLORS } from "@/constants/styles";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  timeFrom: string;
  setTimeFrom: (time: string) => void;
  timeTo: string;
  setTimeTo: (time: string) => void;
  popoverOpen: boolean;
  setPopoverOpen: (open: boolean) => void;
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  popoverOpen,
  setPopoverOpen,
}: DateRangePickerProps) {
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
  );
} 