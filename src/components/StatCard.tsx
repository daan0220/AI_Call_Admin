import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { COLORS, CARD_STYLES } from '@/constants/styles';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card className={CARD_STYLES.container} style={{ border: CARD_STYLES.border }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={CARD_STYLES.icon} style={{ color: COLORS.primary }} />
        <span className={CARD_STYLES.title} style={{ color: COLORS.primary }}>{title}</span>
      </div>
      <div className={CARD_STYLES.value} style={{ color: COLORS.text }}>{value}</div>
    </Card>
  );
} 