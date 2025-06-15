"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Scenario {
  name: string;
  template: string;
  aiNumber: string;
  group: string;
  createdAt: string;
  updatedAt: string;
}

interface ScenarioTableProps {
  data: Scenario[];
}

function ScenarioTable({ data }: ScenarioTableProps) {
  const [copyTarget, setCopyTarget] = useState<Scenario | null>(null);
  return (
    <>
      <table className={TABLE_STYLES.container}>
        <thead>
          <tr className={TABLE_STYLES.header}>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>名称</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>テンプレート</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>関連AI電話番号</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>グループ</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>作成日</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>編集日</th>
            <th className="py-2 px-3" style={{ color: COLORS.primary }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((scenario, index) => (
            <tr key={index} className={TABLE_STYLES.row}>
              <td className={TABLE_STYLES.cell}>{scenario.name}</td>
              <td className={TABLE_STYLES.cell}>{scenario.template}</td>
              <td className={TABLE_STYLES.cell}>{scenario.aiNumber}</td>
              <td className={TABLE_STYLES.cell}>{scenario.group}</td>
              <td className={TABLE_STYLES.cell}>{scenario.createdAt}</td>
              <td className={TABLE_STYLES.cell}>{scenario.updatedAt}</td>
              <td className={TABLE_STYLES.cell}>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    style={{ background: COLORS.primary }}
                  >
                    編集
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                        onClick={() => setCopyTarget(scenario)}
                      >
                        複製
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
                      <DialogHeader className="bg-[#7C6CF6] px-6 py-4">
                        <DialogTitle className="text-white text-center text-lg">シナリオコピー</DialogTitle>
                      </DialogHeader>
                      <div className="px-8 py-8 text-center text-base text-[#666]">
                        {copyTarget && (
                          <span>
                            {copyTarget.name}のシナリオをコピーしますか？
                          </span>
                        )}
                      </div>
                      <DialogFooter className="flex justify-center gap-4 pb-6">
                        <DialogClose asChild>
                          <Button variant="outline" className="w-28">キャンセル</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button style={{ background: '#7C6CF6' }} className="w-28 text-white">コピー</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function ScenariosPage() {
  const scenarios: Scenario[] = [
    {
      name: "折り返し専用(担当者、用件確認)",
      template: "折り返し専用(担当者、用件確認)",
      aiNumber: "05053690814",
      group: "-",
      createdAt: "2025-06-15 23:05:00",
      updatedAt: "2025-06-15 23:06:52",
    },
    {
      name: "代表電話取次ぎ（営業電話抑止）",
      template: "代表電話取次ぎ（営業電話抑止）",
      aiNumber: "05053690814",
      group: "-",
      createdAt: "2025-06-15 23:05:00",
      updatedAt: "2025-06-15 23:06:52",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        シナリオ
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: COLORS.primary }}>
            ＋新規作成
          </Button>
          <Button style={{ background: COLORS.primary }}>
            ＋インポート
          </Button>
        </div>

        <ScenarioTable data={scenarios} />

        <div className="text-xs text-gray-500 mt-4">
          AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ
        </div>
      </Card>
    </div>
  );
} 