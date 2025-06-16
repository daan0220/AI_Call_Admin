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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>名称</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>テンプレート</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>関連AI電話番号</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>グループ</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>作成日</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>編集日</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((scenario, index) => (
            <ClickableTableRow key={index} href={`/scenarios/${index + 1}`}>
              <TableCell className={TABLE_STYLES.cell}>{scenario.name}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.template}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.aiNumber}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.group}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.createdAt}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.updatedAt}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                <div className="flex gap-2 justify-center">
                  <Button size="sm" style={{ background: COLORS.primary }}>編集</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" style={{ color: COLORS.primary, borderColor: COLORS.primary }} onClick={e => e.stopPropagation()}>
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
              </TableCell>
            </ClickableTableRow>
          ))}
        </TableBody>
      </Table>
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
          AI 電話番 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 電話番 ホームページ
        </div>
      </Card>
    </div>
  );
} 