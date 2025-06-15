import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="mb-6">
      <span className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary }}>
        {title}
      </span>
      {children}
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="mb-2">
      <span className="font-medium">{label}：</span>
      <span>{value}</span>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        設定
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <SettingSection title="組織情報">
          <InfoItem label="会社ID" value="2191" />
          <InfoItem label="会社名" value="株式会社Pactom" />
          <InfoItem label="会社名（カナ）" value="カブシキガイシャパクトム" />
          <InfoItem label="事業形態" value="法人（株式会社/合同会社/NPOなど）" />
          <InfoItem label="業種" value="情報・通信" />
          <InfoItem label="住所" value="〒1600023 東京都新宿区西新宿西新宿3丁目3番13号西新宿" />
          <InfoItem label="電話番号" value="08093702122" />
          <InfoItem label="FAX番号" value="" />
          <Button className="mt-2" style={{ background: COLORS.primary }}>
            編集
          </Button>
        </SettingSection>

        <SettingSection title="料金プラン">
          <div className="mb-2">（ここに料金プラン情報を表示）</div>
        </SettingSection>

        <SettingSection title="IP制限">
          <div className="mb-2">（ここにIP制限情報を表示）</div>
        </SettingSection>
      </Card>
    </div>
  );
} 