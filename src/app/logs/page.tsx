"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { CallLogTable, CallLog } from '@/components/logs/CallLogTable';
import { DateRangePicker } from '@/components/logs/DateRangePicker';
import { SearchDialog } from '@/components/logs/SearchDialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useState } from 'react';
import type { DateRange } from "react-day-picker";
import { LOGS_TEXTS } from '@/constants/texts';

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

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        {LOGS_TEXTS.pageTitle}
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            timeFrom={timeFrom}
            setTimeFrom={setTimeFrom}
            timeTo={timeTo}
            setTimeTo={setTimeTo}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
          />
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={LOGS_TEXTS.allNumbers} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{LOGS_TEXTS.allNumbers}</SelectItem>
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
            {LOGS_TEXTS.download}
          </Button>
          <div className="flex-1" />
          <Input placeholder={LOGS_TEXTS.keyword} className="w-48" style={{ borderColor: COLORS.border }} />
          <SearchDialog
            open={searchDialogOpen}
            onOpenChange={setSearchDialogOpen}
            searchForm={searchForm}
            setSearchForm={setSearchForm}
            trigger={<Button variant="link" className="text-[#5B7FFF] underline">{LOGS_TEXTS.detailSearch}</Button>}
          />
        </div>
        <div className="overflow-x-auto">
          <CallLogTable data={callLogs} />
      </div>
      </Card>
    </div>
  );
} 