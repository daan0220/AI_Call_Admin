import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';

interface Holiday {
  date: string;
  dayOfWeek: string;
  name: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface HolidayTableProps {
  data: Holiday[];
}

function HolidayTable({ data }: HolidayTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">日付</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">曜日</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">祝日名</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">備考</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">登録日</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">更新日</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((holiday, index) => (
          <ClickableTableRow key={index} href="/holidays/1">
            <TableCell className={TABLE_STYLES.cell}>{holiday.date}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.dayOfWeek}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.name}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.note}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.createdAt}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.updatedAt}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  style={{ background: COLORS.primary }}
                >
                  編集
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                >
                  削除
                </Button>
              </div>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function HolidaysPage() {
  const holidays: Holiday[] = [
    {
      date: "2025-07-21",
      dayOfWeek: "月",
      name: "海の日",
      note: "-",
      createdAt: "2025-06-15 23:04:59",
      updatedAt: "2025-06-15 23:04:59",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        祝日一覧
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: '#FFE066', color: '#333' }}>
            ＋新規作成
          </Button>
        </div>
        <HolidayTable data={holidays} />
      </Card>
    </div>
  );
} 