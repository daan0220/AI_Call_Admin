"use client";
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { TABLE_STYLES } from '@/constants/styles';

export interface HolidayDetail {
  name: string;
  date: string;
  dayOfWeek: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface HolidayDetailTableProps {
  holiday: HolidayDetail;
}

export function HolidayDetailTable({ holiday }: HolidayDetailTableProps) {
  return (
    <Table className="mb-0 text-base bg-white rounded-xl border" style={{ borderColor: '#E0E0F0' }}>
      <TableBody>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>祝日名 <span className="text-red-500">*</span></TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>日付 <span className="text-red-500">*</span></TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>曜日</TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.dayOfWeek}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>登録日</TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.createdAt}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>更新日</TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.updatedAt}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>備考</TableCell>
          <TableCell className={TABLE_STYLES.cell}>{holiday.note}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
} 