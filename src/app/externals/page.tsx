"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CsvImportDialog } from '@/components/CsvImportDialog';

interface ExternalContact {
  name: string;
  phoneNumber: string;
  company: string;
  department: string;
  action: string;
}

interface ExternalContactTableProps {
  data: ExternalContact[];
}

function ExternalContactTable({ data }: ExternalContactTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">名前</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">電話番号</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">会社名</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">部門名</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">着信時の動作</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((contact, index) => (
          <ClickableTableRow key={index} href="/externals/1">
            <TableCell className={TABLE_STYLES.cell}>{contact.name}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.phoneNumber}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.company}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.department}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{contact.action}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>
              <Button
                size="sm"
                style={{ background: COLORS.primary }}
              >
                編集
              </Button>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ExternalsPage() {
  const contacts: ExternalContact[] = [
    {
      name: "-",
      phoneNumber: "-",
      company: "-",
      department: "-",
      action: "-",
    },
  ];
  
  const router = useRouter();
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const handleImport = (file: File) => {
    alert(`「${file.name}」をインポートしました（ダミー処理）`);
    setCsvDialogOpen(false);
  };

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        社外名簿
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: '#FFE066', color: '#333' }} onClick={() => router.push('/externals/new')}>
            ＋新規作成
          </Button>
          <CsvImportDialog
            open={csvDialogOpen}
            onOpenChange={setCsvDialogOpen}
            trigger={<Button style={{ background: '#FFE066', color: '#333' }}>＋CSVファイルで一括作成</Button>}
            title="一括社外名簿新規作成"
            description={<>CSVテンプレートをダウンロードの上、名簿データを作成しアップロードしてください。<br />以下薄青色のフィールドにドラッグ＆ドロップ後、インポートボタンを押すことで、社外名簿を反映することができます。</>}
            templateLabel="CSVテンプレートをダウンロード"
            onTemplateDownload={() => alert('テンプレートDL（ダミー）')}
            onImport={handleImport}
            importButtonLabel="インポート"
            notes={[
              '※ アップロード可能なファイルは「.CSV」のみになります。',
              '※ CSVファイルから一度に最大500までの社外名簿を追加することができます。',
              '※ 姓名および読み方（カナ）を含め必ずご入力ください。',
              '※ 着信先を判別できるよう、1社につき1つの番号のみ登録することができます。同じ会社・同じ電話番号で複数名を登録される場合は、個人の携帯電話番号などでの登録を推奨いたします。',
            ]}
            accept=".csv"
          />
        </div>
        <ExternalContactTable data={contacts} />
      </Card>
    </div>
  );
} 