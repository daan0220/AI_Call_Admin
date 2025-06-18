"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { TABLE_STYLES } from '@/constants/styles';
import { ClickableTableRow } from '@/components/ClickableTableRow';

export interface CallLog {
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

interface CallLogTableProps {
  data: CallLog[];
}

export function CallLogTable({ data }: CallLogTableProps) {
  return (
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
        {data.map((log, index) => (
          <ClickableTableRow key={index} href={`/logs/${index + 1}`}>
            <TableCell className={TABLE_STYLES.cell}>{log.timestamp}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.type}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.from}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.to}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.aiNumber}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.scenario}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.result}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.operation || '-'}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.recording || '-'}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{log.status || '-'}</TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
} 