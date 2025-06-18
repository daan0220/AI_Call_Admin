"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export interface IpRestriction {
  description: string;
  ip: string;
  target: string;
  creator: string;
  createdAt: string;
  updater: string;
  updatedAt: string;
}

interface IpRestrictionTableProps {
  data: IpRestriction[];
  onEdit?: (row: IpRestriction) => void;
  onDelete?: (row: IpRestriction) => void;
}

export function IpRestrictionTable({ data, onEdit, onDelete }: IpRestrictionTableProps) {
  return (
    <Table className="w-full text-sm bg-white rounded-xl border">
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">説明</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">IPアドレス</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">制限対象</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">作成者</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">作成日</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">更新者</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">更新日</TableHead>
          <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-8 text-center text-gray-400">データなし</TableCell>
          </TableRow>
        ) : data.map((row, i) => (
          <TableRow key={i}>
            <TableCell className="py-2 px-4">{row.description}</TableCell>
            <TableCell className="py-2 px-4">{row.ip}</TableCell>
            <TableCell className="py-2 px-4">{row.target}</TableCell>
            <TableCell className="py-2 px-4">{row.creator}</TableCell>
            <TableCell className="py-2 px-4">{row.createdAt}</TableCell>
            <TableCell className="py-2 px-4">{row.updater}</TableCell>
            <TableCell className="py-2 px-4">{row.updatedAt}</TableCell>
            <TableCell className="py-2 px-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="rounded-md border-[#5B7FFF] text-[#5B7FFF] font-normal px-3 py-1 text-xs bg-transparent hover:bg-[#EDF3FF]! hover:text-[#5B7FFF] transition-colors"
                style={{ borderWidth: 1 }}
                onClick={() => onEdit?.(row)}
              >
                編集
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-md border-[#E94B4B] text-[#E94B4B] font-normal px-3 py-1 text-xs bg-transparent hover:bg-[#FFF0F0]! hover:text-[#E94B4B] transition-colors"
                style={{ borderWidth: 1 }}
                onClick={() => onDelete?.(row)}
              >
                削除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 