import { StatCard } from '@/components/StatCard';
import { stats } from '@/constants/stats';
import { COLORS } from '@/constants/styles';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HOME_TEXTS } from '@/constants/texts';

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card className="mb-8 p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>{HOME_TEXTS.noticeTitle}</h2>
        <Separator className="mb-4" />
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          {HOME_TEXTS.notices.map((notice, i) => (
            <li key={i}>{notice}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>{HOME_TEXTS.guideTitle}</h2>
        <Separator className="mb-4" />
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          {HOME_TEXTS.guides.map((guide, i) => (
            <li key={i}>{guide}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
