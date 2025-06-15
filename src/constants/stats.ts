import { Phone, Workflow, Users, History, CreditCard } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
}

export const stats: Stat[] = [
  {
    title: "AI電話番号",
    value: "3",
    icon: Phone,
  },
  {
    title: "シナリオ",
    value: "12",
    icon: Workflow,
  },
  {
    title: "今月の請求金額",
    value: "¥12,000",
    icon: CreditCard,
  },
  {
    title: "今月の通話数",
    value: "1,234",
    icon: History,
  },
]; 