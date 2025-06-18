"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { COLORS, TABLE_STYLES } from '@/constants/styles';
import { ClickableTableRow } from '@/components/ClickableTableRow';

export interface Holiday {
  date: string; // yyyy-MM-dd
  dayOfWeek: string; // 月, 火, ...
  name: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface HolidayTableProps {
  data: Holiday[];
  onEdit?: (holiday: Holiday) => void;
  onDelete?: (holiday: Holiday) => void;
}

export function HolidayTable({ data, onEdit, onDelete }: HolidayTableProps) {
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
          <ClickableTableRow key={index} href={`/holidays/${holiday.date}`}>
            <TableCell className={TABLE_STYLES.cell}>{holiday.date}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.dayOfWeek}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.name}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.note}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.createdAt}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{holiday.updatedAt}</TableCell>
            <TableCell className={TABLE_STYLES.cell} data-no-row-link>
              <div className="flex gap-2 justify-center">
                <Button size="sm" style={{ background: COLORS.primary }} onClick={() => onEdit?.(holiday)} data-no-row-link>編集</Button>
                <Button size="sm" variant="outline" style={{ color: COLORS.primary, borderColor: COLORS.primary }} onClick={() => onDelete?.(holiday)} data-no-row-link>削除</Button>
              </div>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
} 