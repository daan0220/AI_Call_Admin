import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";

interface PhoneNumber {
  id: string;
  status: string;
  number: string;
  businessHoursAction: {
    scenario: string;
    canChange: boolean;
  };
  validPeriod: {
    start: string;
    end: string;
  };
  businessHours: {
    days: string;
    time: string;
  };
  afterHoursAction: string;
}

interface PhoneNumberTableProps {
  data: PhoneNumber[];
}

function PhoneNumberTable({ data }: PhoneNumberTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className={TABLE_STYLES.container}>
        <thead>
          <tr className={TABLE_STYLES.header}>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>ID</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>ステータス</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>電話番号</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間内の動作</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>有効日</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>営業時間外の動作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((phone) => (
            <tr key={phone.id} className={TABLE_STYLES.row}>
              <td className={TABLE_STYLES.cell}>{phone.id}</td>
              <td className={TABLE_STYLES.cell}>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                >
                  {phone.status}
                </Badge>
              </td>
              <td className={TABLE_STYLES.cell}>{phone.number}</td>
              <td className={TABLE_STYLES.cell}>
                <div className="flex items-center justify-center gap-2">
                  <span>{phone.businessHoursAction.scenario}</span>
                  {phone.businessHoursAction.canChange && (
                    <Button
                      size="sm"
                      className="text-xs"
                      style={{ background: COLORS.primary }}
                    >
                      変更
                    </Button>
                  )}
                </div>
              </td>
              <td className={TABLE_STYLES.cell}>
                {phone.validPeriod.start}
                <br />
                〜{phone.validPeriod.end}
              </td>
              <td className={TABLE_STYLES.cell}>
                {phone.businessHours.days}
                <br />
                {phone.businessHours.time}
              </td>
              <td className={TABLE_STYLES.cell}>{phone.afterHoursAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function NumbersPage() {
  const phoneNumbers: PhoneNumber[] = [
    {
      id: "187",
      status: "デモ利用中",
      number: "05053690814",
      businessHoursAction: {
        scenario: "代表電話取次ぎ（営業電話抑止）",
        canChange: true,
      },
      validPeriod: {
        start: "2025-06-15",
        end: "2100-12-31",
      },
      businessHours: {
        days: "月火水木金",
        time: "08:00〜19:00",
      },
      afterHoursAction: "折り返し専用(担当者、用件確認)",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        AI電話番号
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="mb-4 text-base font-semibold" style={{ color: COLORS.primary }}>
          デモ利用中
        </div>

        <PhoneNumberTable data={phoneNumbers} />

        <div className="text-xs text-gray-500 mt-4">
          AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ
        </div>
      </Card>
    </div>
  );
} 