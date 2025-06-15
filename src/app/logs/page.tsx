import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";

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
    <table className={TABLE_STYLES.container}>
      <thead>
        <tr className={TABLE_STYLES.header}>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>発着信時間</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>通話タイプ</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>発信元</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>着信先</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>AI電話番号</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>関連シナリオ</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>通話結果</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log, index) => (
          <tr key={index} className={TABLE_STYLES.row}>
            <td className={TABLE_STYLES.cell}>{log.timestamp}</td>
            <td className={TABLE_STYLES.cell}>{log.type}</td>
            <td className={TABLE_STYLES.cell}>{log.from}</td>
            <td className={TABLE_STYLES.cell}>{log.to}</td>
            <td className={TABLE_STYLES.cell}>{log.aiNumber}</td>
            <td className={TABLE_STYLES.cell}>{log.scenario}</td>
            <td className={TABLE_STYLES.cell}>{log.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
          AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ
        </div>
      </Card>
    </div>
  );
} 