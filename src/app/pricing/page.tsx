import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";

interface Plan {
  name: "START" | "LITE" | "BASIC" | "PRO";
  price: number;
  headline: string;
  features: string[];
  badge?: "体験中" | "おすすめ";
}

function PricingCard({ name, price, headline, features, badge }: Plan) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>{name}</h3>
        <div className="text-2xl font-bold mb-1">¥{price.toLocaleString()}</div>
        <div className="text-sm text-gray-600">{headline}</div>
      </div>
      <ul className="flex-grow space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <span className="mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {badge && (
        <Badge
          variant="outline"
          className="self-start"
          style={{
            color: badge === "体験中" ? COLORS.primary : "#FFD600",
            borderColor: badge === "体験中" ? COLORS.primary : "#FFD600",
          }}
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}

const plans: Plan[] = [
  {
    name: "START",
    price: 500,
    headline: "電話が少ない⼩規模",
    features: ["折り返し", "担当者転送"],
    badge: "体験中",
  },
  {
    name: "LITE",
    price: 2980,
    headline: "クラウドPBX ⽤",
    features: ["STARTの全機能", "ホワイトリスト"],
  },
  {
    name: "BASIC",
    price: 4980,
    headline: "AI取次 標準",
    features: ["START/LITEの全機能", "カスタマイズ"],
    badge: "おすすめ",
  },
  {
    name: "PRO",
    price: 30000,
    headline: "問合せ窓口あり企業",
    features: ["全機能", "FAQ", "GPT連携"],
  },
];

export default function PricingPage() {
  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        料金プラン
      </h1>
      <div className="grid gap-6 lg:grid-cols-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="p-6"
            style={{
              borderColor: plan.name === "PRO" ? "#FFD600" : COLORS.border,
              borderWidth: plan.name === "PRO" ? "2px" : "1px",
            }}
          >
            <PricingCard {...plan} />
          </Card>
        ))}
      </div>
    </div>
  );
} 