"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { useState } from "react";
import { OrgInfoSection, OrgInfo } from '@/components/settings/OrgInfoSection';
import { IpRestrictionTable, IpRestriction } from '@/components/settings/IpRestrictionTable';
import { SETTINGS_TEXTS } from '@/constants/texts';

export default function SettingsPage() {
  const [tab, setTab] = useState<'org' | 'ip'>('org');

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex gap-2 mb-4">
        <Button
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-colors duration-150 ${tab === 'org' ? 'bg-[#5B7FFF] text-white shadow' : 'bg-white text-[#6B687A] border border-[#E0E0F0]'}`}
          style={{ minWidth: 120 }}
          onClick={() => setTab('org')}
        >
          {SETTINGS_TEXTS.orgInfo}
        </Button>
        <Button
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-colors duration-150 ${tab === 'ip' ? 'bg-[#5B7FFF] text-white shadow' : 'bg-white text-[#6B687A] border border-[#E0E0F0]'}`}
          style={{ minWidth: 120 }}
          onClick={() => setTab('ip')}
        >
          {SETTINGS_TEXTS.ipRestriction}
        </Button>
        </div>
      {tab === 'org' && (
        <Card className="p-8" style={{ borderColor: COLORS.border }}>
          <OrgInfoSection
            info={{
              companyId: "2191",
              companyName: "株式会社Pactom",
              companyKana: "カブシキガイシャパクトム",
              businessType: "法人（株式会社/合同会社/NPOなど）",
              industry: "情報・通信",
              address: "〒1600023 東京都新宿区西新宿西新宿3丁目3番13号西新宿",
              phone: "08093702122",
              fax: "",
            }}
            onEdit={() => alert('編集（ダミー）')}
          />
        </Card>
      )}
      {tab === 'ip' && (
        <Card className="p-8" style={{ borderColor: COLORS.border }}>
          <div className="flex justify-between items-center mb-4">
            <Button style={{ background: '#FFE066', color: '#333', fontWeight: 600 }}>{SETTINGS_TEXTS.newButton}</Button>
            <div className="flex items-center gap-2">
              <input type="text" placeholder={SETTINGS_TEXTS.keyword} className="border rounded px-3 py-1 text-sm" />
              <a href="#" className="text-[#5B7FFF] text-sm font-semibold underline">{SETTINGS_TEXTS.detailSearch}</a>
        </div>
      </div>
          <div className="overflow-x-auto">
            <IpRestrictionTable
              data={[]}
              onEdit={() => alert('編集（ダミー）')}
              onDelete={() => alert('削除（ダミー）')}
            />
          </div>
        </Card>
      )}
    </div>
  );
} 