import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";

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
    <table className={TABLE_STYLES.container}>
      <thead>
        <tr className={TABLE_STYLES.header}>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>日付</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>曜日</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>祝日名</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>備考</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>登録日</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>更新日</th>
          <th className="py-2 px-3" style={{ color: COLORS.primary }}>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map((holiday, index) => (
          <tr key={index} className={TABLE_STYLES.row}>
            <td className={TABLE_STYLES.cell}>{holiday.date}</td>
            <td className={TABLE_STYLES.cell}>{holiday.dayOfWeek}</td>
            <td className={TABLE_STYLES.cell}>{holiday.name}</td>
            <td className={TABLE_STYLES.cell}>{holiday.note}</td>
            <td className={TABLE_STYLES.cell}>{holiday.createdAt}</td>
            <td className={TABLE_STYLES.cell}>{holiday.updatedAt}</td>
            <td className={TABLE_STYLES.cell}>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
          <Button style={{ background: COLORS.primary }}>
            ＋新規作成
          </Button>
        </div>

        <HolidayTable data={holidays} />

        <div className="text-xs text-gray-500 mt-4">
          AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ
        </div>
      </Card>
    </div>
  );
} 