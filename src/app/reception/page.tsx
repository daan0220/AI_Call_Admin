import { Card } from "@/components/ui/card";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { Phone, Clock, CheckCircle, XCircle } from "lucide-react";

const receptionStats = [
  {
    title: "現在の通話数",
    value: "3",
    icon: Phone,
  },
  {
    title: "平均通話時間",
    value: "2分30秒",
    icon: Clock,
  },
  {
    title: "成功",
    value: "85%",
    icon: CheckCircle,
  },
  {
    title: "失敗",
    value: "15%",
    icon: XCircle,
  },
];

export default function ReceptionPage() {
  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        受付サービス
      </h1>
      <div className={`${LAYOUT_STYLES.grid.base} ${LAYOUT_STYLES.grid.responsive}`}>
        {receptionStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={LAYOUT_STYLES.grid.base}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-6 w-6" style={{ color: COLORS.primary }} />
                <span className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                  {stat.title}
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color: COLORS.text }}>
                {stat.value}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 