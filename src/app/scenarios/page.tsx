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
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const [copyTarget] = useState<Scenario | null>(null);
  const router = useRouter();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>会社名</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>相手の名前</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>担当者</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>要件</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>折り返し希望</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>折り返し先電話番号</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>AI電話番号</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>作成日</TableHead>
            <TableHead className="py-2 px-3" style={{ color: COLORS.primary }}>操作</TableHead>
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
                        複製
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
                      <div className="relative">
                        <DialogHeader className="bg-[#7C6CF6] px-6 py-4 flex justify-center items-center">
                          <DialogTitle className="text-white text-center text-lg w-full">シナリオコピー</DialogTitle>
                          <DialogClose asChild>
                            <button className="absolute right-4 top-4 text-white text-2xl leading-none">×</button>
                          </DialogClose>
                        </DialogHeader>
                        <div className="px-8 py-12 text-center text-base text-[#666]">
                          {scenario.company ? (
                            <span>
                              {scenario.company}のシナリオをコピーしますか？
                            </span>
                          ) : (
                            <span>このシナリオをコピーしますか？</span>
                          )}
                        </div>
                        <div className="flex justify-center gap-4 pb-8">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-32">キャンセル</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button style={{ background: '#7C6CF6' }} className="w-32 text-white">コピー</Button>
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
  const [importFile, setImportFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
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

  // ファイル選択・ドロップ処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.scenario')) {
      setImportFile(file);
    } else {
      setImportFile(null);
      alert('拡張子が .scenario のファイルのみインポートできます');
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.scenario')) {
      setImportFile(file);
    } else {
      setImportFile(null);
      alert('拡張子が .scenario のファイルのみインポートできます');
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleImport = () => {
    if (importFile) {
      alert(`「${importFile.name}」をインポートしました（ダミー処理）`);
      setImportOpen(false);
      setImportFile(null);
    } else {
      alert('ファイルを選択してください');
    }
  };

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
          シナリオ
        </h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: COLORS.primary }} onClick={() => router.push('/scenarios/new')}>
            ＋新規作成
          </Button>
          <Dialog open={importOpen} onOpenChange={setImportOpen}>
            <DialogTrigger asChild>
              <Button style={{ background: COLORS.primary }} onClick={() => setImportOpen(true)}>
                ＋インポート
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-xl p-0 overflow-hidden">
              <DialogHeader className="bg-[#7C6CF6] px-6 py-4">
                <DialogTitle className="text-white text-center text-lg">シナリオをインポート</DialogTitle>
              </DialogHeader>
              <div className="px-8 py-8 text-center text-base text-[#666]">
                <label
                  htmlFor="import-file"
                  className={`block border-2 border-dashed rounded-xl py-8 px-4 mb-4 cursor-pointer transition ${dragActive ? 'border-[#7C6CF6] bg-violet-50' : 'border-[#C7BFFF] bg-white'}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <UploadCloud size={64} className="mx-auto mb-2 text-[#7C6CF6]" />
                  <div className="mb-2">アップロードするファイルを選択<br />またはファイルをドラッグ＆ドロップします</div>
                  <input
                    id="import-file"
                    type="file"
                    accept=".scenario"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {importFile && <div className="mt-2 text-sm text-[#7C6CF6]">選択中: {importFile.name}</div>}
                </label>
                <ul className="text-xs text-left text-gray-500 leading-relaxed">
                  <li>※インポートできるのはAI 電話番からエクスポートしたファイル（.scenario）のみになります。</li>
                  <li>※エクスポートされたファイルを編集するとインポートエラーとなりますのでご注意ください。</li>
                  <li>※一括インポートはできません。</li>
                </ul>
              </div>
              <div className="flex justify-center gap-4 pb-6">
                <DialogClose asChild>
                  <Button variant="outline" className="w-28">キャンセル</Button>
                </DialogClose>
                <Button style={{ background: '#7C6CF6' }} className="w-28 text-white" onClick={handleImport}>インポート</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <ScenarioTable data={scenarios} />
      </Card>
      <footer className="w-full text-xs text-gray-500 text-center mt-8 pb-4">
        AI 電話番 V1.8.0.4 | Copyright © 2025 Enginee Co., Ltd , All Rights Reserved | AI 電話番
      </footer>
    </div>
  );
} 