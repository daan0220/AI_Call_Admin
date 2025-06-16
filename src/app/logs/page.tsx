import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';

interface CallLog {
  timestamp: string;
  type: string;
  from: string;
  to: string;
  aiNumber: string;
  scenario: string;
  result: string;
}

interface CallLogTableProps {
  data: CallLog[];
}

function CallLogTable({ data }: CallLogTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>発着信時間</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>通話タイプ</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>発信元</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>着信先</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>AI電話番号</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>関連シナリオ</TableHead>
          <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>通話結果</TableHead>
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
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function LogsPage() {
  const callLogs: CallLog[] = [
    {
      timestamp: "-",
      type: "-",
      from: "-",
      to: "-",
      aiNumber: "-",
      scenario: "-",
      result: "-",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        通話履歴
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="flex mb-4 gap-2">
          <Input
            placeholder="キーワード"
            className="flex-1"
            style={{ borderColor: COLORS.border }}
          />
          <Button style={{ background: COLORS.primary }}>
            詳細検索
          </Button>
        </div>

        <CallLogTable data={callLogs} />

        <div className="text-xs text-gray-500 mt-4">
          AI 電話番 V1.8.0.4 | Copyright © 2025 Enginee Co., Ltd , All Rights Reserved | AI 電話番
        </div>
      </Card>
      <footer className="w-full text-xs text-gray-500 text-center mt-8 pb-4">
        AI 電話番 V1.8.0.4 | Copyright © 2025 Enginee Co., Ltd , All Rights Reserved | AI 電話番
      </footer>
    </div>
  );
} 