import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";

interface ExternalContact {
  name: string;
  phoneNumber: string;
  company: string;
  department: string;
  action: string;
}

interface ExternalContactTableProps {
  data: ExternalContact[];
}

function ExternalContactTable({ data }: ExternalContactTableProps) {
  return (
    <table className={TABLE_STYLES.container}>
      <thead>
        <tr className={TABLE_STYLES.header}>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>名前</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>電話番号</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>会社名</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>部門名</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>着信時の動作</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((contact, index) => (
          <tr key={index} className={TABLE_STYLES.row}>
            <td className={TABLE_STYLES.cell}>{contact.name}</td>
            <td className={TABLE_STYLES.cell}>{contact.phoneNumber}</td>
            <td className={TABLE_STYLES.cell}>{contact.company}</td>
            <td className={TABLE_STYLES.cell}>{contact.department}</td>
            <td className={TABLE_STYLES.cell}>{contact.action}</td>
            <td className={TABLE_STYLES.cell}>
              <Button
                size="sm"
                style={{ background: COLORS.primary }}
              >
                編集
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ExternalsPage() {
  const contacts: ExternalContact[] = [
    {
      name: "-",
      phoneNumber: "-",
      company: "-",
      department: "-",
      action: "-",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        社外名簿
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: COLORS.primary }}>
            ＋新規作成
          </Button>
          <Button style={{ background: COLORS.primary }}>
            ＋CSVファイルで一括作成
          </Button>
        </div>

        <ExternalContactTable data={contacts} />

        <div className="text-xs text-gray-500 mt-4">
          AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ
        </div>
      </Card>
    </div>
  );
} 