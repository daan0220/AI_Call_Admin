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
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { useRouter } from "next/navigation";
import { CsvImportDialog } from '@/components/CsvImportDialog';
import { SCENARIO_TEXTS } from "@/constants/texts";

interface Scenario {
  company: string;
  callerName: string;
  staff: string;
  purpose: string;
  callback: boolean;
  callbackNumber?: string;
  aiNumber: string;
  createdAt: string;
}

interface ScenarioTableProps {
  data: Scenario[];
}

function ScenarioTable({ data }: ScenarioTableProps) {
  const router = useRouter();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.company}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.callerName}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.staff}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.purpose}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.callback}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.callbackNumber}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.aiNumber}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.createdAt}</TableHead>
            <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">{SCENARIO_TEXTS.table.action}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((scenario, index) => (
            <ClickableTableRow key={index} href={`/scenarios/${index + 1}`}>
              <TableCell className={TABLE_STYLES.cell}>{scenario.company}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.callerName}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.staff}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.purpose}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.callback ? 'はい' : 'いいえ'}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.callback ? scenario.callbackNumber : '-'}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.aiNumber}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>{scenario.createdAt}</TableCell>
              <TableCell className={TABLE_STYLES.cell}>
                <div className="flex gap-2 justify-center" onClick={e => e.stopPropagation()}>
                  <Button size="sm" style={{ background: COLORS.primary }} onClick={() => router.push(`/scenarios/${index + 1}/edit`)}>編集</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" style={{ color: COLORS.primary, borderColor: COLORS.primary }} onClick={e => e.stopPropagation()}>
                        {SCENARIO_TEXTS.copy}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
                      <div className="relative">
                        <DialogHeader className="bg-[#5B7FFF] px-6 py-4 flex justify-center items-center">
                          <DialogTitle className="text-white text-center text-lg w-full">{SCENARIO_TEXTS.copyDialog.title}</DialogTitle>
                          <DialogClose asChild>
                          </DialogClose>
                        </DialogHeader>
                        <div className="px-8 py-12 text-center text-base text-[#666]">
                          <span>
                            {SCENARIO_TEXTS.copyDialog.confirm(scenario.company)}
                          </span>
                        </div>
                        <div className="flex justify-center gap-4 pb-8">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-32">{SCENARIO_TEXTS.copyDialog.cancel}</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button style={{ background: '#5B7FFF' }} className="w-32 text-white">{SCENARIO_TEXTS.copyDialog.copy}</Button>
                          </DialogClose>
                        </div>
                      </div>
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
  const [importOpen, setImportOpen] = useState(false);
  const scenarios: Scenario[] = [
    {
      company: "株式会社サンプル",
      callerName: "山田 太郎",
      staff: "佐藤 花子",
      purpose: "契約内容の確認",
      callback: true,
      callbackNumber: "09012345678",
      aiNumber: "05053690814",
      createdAt: "2025-06-15 23:05:00",
    },
    {
      company: "有限会社テスト",
      callerName: "鈴木 次郎",
      staff: "田中 一郎",
      purpose: "資料送付依頼",
      callback: false,
      aiNumber: "05053690815",
      createdAt: "2025-06-16 10:12:00",
    },
  ];
  const router = useRouter();

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex justify-between items-center mb-3">
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 0 }}>
          {SCENARIO_TEXTS.pageTitle}
        </h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: '#FFE066', color: '#333' }} onClick={() => router.push('/scenarios/new')}>
            {SCENARIO_TEXTS.newButton}
          </Button>
          <CsvImportDialog
            open={importOpen}
            onOpenChange={setImportOpen}
            trigger={<Button className="rounded px-4 py-2" style={{ background: '#FFE066', color: '#333' }}>{SCENARIO_TEXTS.importButton}</Button>}
            title={SCENARIO_TEXTS.importDialog.title}
            description={<><span className="text-[#5B7FFF] font-bold">{SCENARIO_TEXTS.importDialog.description}</span></>}
            templateLabel={SCENARIO_TEXTS.importDialog.templateLabel}
            onTemplateDownload={() => alert('テンプレートDL（ダミー）')}
            onImport={() => alert('インポート処理（ダミー）')}
            importButtonLabel={SCENARIO_TEXTS.importDialog.importButton}
            notes={SCENARIO_TEXTS.importDialog.notes}
            accept=".scenario"
          />
        </div>
        <ScenarioTable data={scenarios} />
      </Card>
    </div>
  );
} 