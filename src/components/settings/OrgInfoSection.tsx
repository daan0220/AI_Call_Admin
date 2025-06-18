"use client";
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/styles';

export interface OrgInfo {
  companyId: string;
  companyName: string;
  companyKana: string;
  businessType: string;
  industry: string;
  address: string;
  phone: string;
  fax: string;
}

interface OrgInfoSectionProps {
  info: OrgInfo;
  onEdit?: () => void;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-bold tracking-wide text-base text-[#6B687A] min-w-[140px]">{label}：</span>
      <span className="font-bold tracking-wide text-base text-[#6B687A]">{value}</span>
    </div>
  );
}

export function OrgInfoSection({ info, onEdit }: OrgInfoSectionProps) {
  return (
    <div>
      <InfoItem label="会社ID" value={info.companyId} />
      <InfoItem label="会社名" value={info.companyName} />
      <InfoItem label="会社名（カナ）" value={info.companyKana} />
      <InfoItem label="事業形態" value={info.businessType} />
      <InfoItem label="業種" value={info.industry} />
      <InfoItem label="住所" value={info.address} />
      <InfoItem label="電話番号" value={info.phone} />
      <InfoItem label="FAX番号" value={info.fax} />
      <Button className="mt-2" style={{ background: COLORS.primary }} onClick={onEdit}>
        編集
      </Button>
    </div>
  );
} 