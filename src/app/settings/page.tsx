"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { useState } from "react";

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
  const [tab, setTab] = useState<'org' | 'ip'>('org');

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        設定
      </h1>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold text-sm ${tab === 'org' ? 'bg-[#2563eb] text-white' : 'bg-[#F5F8FF] text-[#666]'}`}
          onClick={() => setTab('org')}
        >
          組織情報
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold text-sm ${tab === 'ip' ? 'bg-[#2563eb] text-white' : 'bg-[#F5F8FF] text-[#666]'}`}
          onClick={() => setTab('ip')}
        >
          IP制限
        </button>
      </div>
      {tab === 'org' && (
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
        </Card>
      )}
      {tab === 'ip' && (
        <Card className="p-8" style={{ borderColor: COLORS.border }}>
          <SettingSection title="IP制限">
            <div className="flex justify-between items-center mb-4">
              <Button style={{ background: '#22c55e', color: 'white' }}>新規作成</Button>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="キーワード" className="border rounded px-3 py-1 text-sm" />
                <a href="#" className="text-[#2563eb] text-sm font-semibold">詳細検索</a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-xl border" style={{ borderColor: '#2563eb' }}>
                <thead>
                  <tr className="bg-[#2563eb] text-white">
                    <th className="py-2 px-4 font-semibold">説明</th>
                    <th className="py-2 px-4 font-semibold">IPアドレス</th>
                    <th className="py-2 px-4 font-semibold">制限対象</th>
                    <th className="py-2 px-4 font-semibold">作成者</th>
                    <th className="py-2 px-4 font-semibold">作成日</th>
                    <th className="py-2 px-4 font-semibold">更新者</th>
                    <th className="py-2 px-4 font-semibold">更新日</th>
                    <th className="py-2 px-4 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400">データなし</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SettingSection>
        </Card>
      )}
    </div>
  );
} 