"use client";
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TABLE_STYLES, COLORS } from '@/constants/styles';

export interface HolidayEditForm {
  name: string;
  date: string;
  note: string;
}

interface HolidayEditTableProps {
  form: HolidayEditForm;
  onChange: (form: HolidayEditForm) => void;
}

export function HolidayEditTable({ form, onChange }: HolidayEditTableProps) {
  return (
    <Table className="mb-0 text-base bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
      <TableBody>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>祝日名 <span className="text-red-500">*</span></TableCell>
          <TableCell className={TABLE_STYLES.cell}>
            <Input value={form.name} onChange={e => onChange({ ...form, name: e.target.value })} required />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>日付 <span className="text-red-500">*</span></TableCell>
          <TableCell className={TABLE_STYLES.cell}>
            <Input type="date" value={form.date} onChange={e => onChange({ ...form, date: e.target.value })} required />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="bg-[#F5F6FB] font-semibold w-64 align-middle" style={{fontWeight:600}}>備考</TableCell>
          <TableCell className={TABLE_STYLES.cell}>
            <Textarea value={form.note} onChange={e => onChange({ ...form, note: e.target.value })} rows={3} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
} 