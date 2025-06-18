"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { COLORS, TABLE_STYLES } from '@/constants/styles';
import { ClickableTableRow } from '@/components/ClickableTableRow';

export interface ExternalContact {
  name: string;
  phoneNumber: string;
  company: string;
  department: string;
  action?: string;
}

interface ExternalContactTableProps {
  data: ExternalContact[];
  onEdit?: (contact: ExternalContact) => void;
}

export function ExternalContactTable({ data, onEdit }: ExternalContactTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">名前</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">電話番号</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">会社名</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">部門名</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((contact, index) => (
          <ClickableTableRow key={index} href={`/externals/${index + 1}`}>
            <TableCell className={TABLE_STYLES.cell}>{contact.name}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.phoneNumber}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.company}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.department}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>
              <Button
                size="sm"
                style={{ background: COLORS.primary }}
                onClick={e => { e.stopPropagation(); onEdit?.(contact); }}
              >
                編集
              </Button>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
} 