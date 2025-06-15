import { StatCard } from '@/components/StatCard';
import { stats } from '@/constants/stats';
import { COLORS } from '@/constants/styles';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>ホーム</h1>
        <div className="text-gray-500 text-base mb-2">AIコール受付管理ダッシュボードへようこそ</div>
        <Separator className="my-2 bg-[#5B7FFF] h-1 w-16 rounded" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card className="mb-8 p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>お知らせ</h2>
        <Separator className="mb-4" />
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>2024/06/15　新機能「シナリオ複製」リリース！</li>
          <li>2024/06/10　UIデザインをリニューアルしました。</li>
          <li>2024/06/01　AI電話番号の利用状況がグラフで見られるようになりました。</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>使い方ガイド</h2>
        <Separator className="mb-4" />
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li>左のメニューから各機能にアクセスできます。</li>
          <li>「シナリオ」ではAI応答の流れを自由に設計できます。</li>
          <li>「通話履歴」から過去のAI応答内容を確認できます。</li>
        </ul>
      </Card>
    </div>
  );
}
