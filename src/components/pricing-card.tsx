import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Plan = {
  name: "START" | "LITE" | "BASIC" | "PRO";
  price: number;
  headline: string;
  features: string[];
  badge?: "おすすめ" | "体験中";
};

interface PricingCardProps extends Plan {
  className?: string;
}

export function PricingCard({
  name,
  price,
  headline,
  features,
  badge,
  className,
}: PricingCardProps) {
  const isPro = name === "PRO";

  return (
    <Card
      className={cn(
        "flex flex-col",
        isPro && "border-yellow-400",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          {badge && (
            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {badge}
            </span>
          )}
        </div>
        <CardDescription>{headline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-3xl font-bold">¥{price.toLocaleString()}</span>
          <span className="text-muted-foreground">/月</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          体験する
        </Button>
        <Button className="flex-1">契約する</Button>
      </CardFooter>
    </Card>
  );
} 