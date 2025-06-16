"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ClickableTableRow } from '@/components/ClickableTableRow';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { CsvImportDialog } from '@/components/CsvImportDialog';

export default function MembersPage() {
  const router = useRouter();
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [csvEditDialogOpen, setCsvEditDialogOpen] = useState(false);

  const handleImport = (file: File) => {
    alert(`「${file.name}」をインポートしました（ダミー処理）`);
    setCsvDialogOpen(false);
  };

  const handleEditUpdate = (file: File) => {
    alert(`「${file.name}」で一括編集を実行しました（ダミー処理）`);
    setCsvEditDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿</h1>
      <div className="rounded-xl shadow-md bg-white p-8" style={{ border: '1px solid #D6E2FF' }}>
        <div className="flex mb-4 gap-2">
          <Button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }} onClick={() => router.push('/members/new')}>＋新規作成</Button>
          <CsvImportDialog
            open={csvDialogOpen}
            onOpenChange={setCsvDialogOpen}
            trigger={<Button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋CSVファイルで一括作成</Button>}
            title="新規社員名簿一括作成"
            description={<><span className="text-[#5B7FFF] font-bold">一括作成した名簿の着信ステータスが<mark className='bg-transparent text-green-600 font-bold'>着信可</mark>になっており、問題なくインポートされた場合も当該ファイルの名簿登録課金対象</span>となります。<br /><span className="text-[#E94B4B] font-bold">名簿登録課金料は月額300円（税抜）/人</span>、既に名簿登録されている社員は課金対象外です。<br /><span className="text-[#5B7FFF] font-bold">※30日間無料デモ/フリープラン期間中は5名まで無料で作成できます</span>。</>}
            templateLabel="CSVテンプレートをダウンロード"
            onTemplateDownload={() => alert('テンプレートDL（ダミー）')}
            onImport={handleImport}
            importButtonLabel="インポート"
            notes={[
              '※.CSVファイルから一度に最大500までの社員名簿を追加することができます。',
              '※アップロードいただいたデータがすべて同一の場合、既に存在しているデータとなり登録失敗となります。',
              '※重複している名前、電話番号が存在する場合、アップロード確認時にアラートが表示されます。',
              '※一括作成いただく際、アカウントの権限は「一般」で登録されます。変更の必要がある場合は一括作成後、編集より権限の変更をお願いいたします。',
            ]}
            accept=".csv"
          />
          <CsvImportDialog
            open={csvEditDialogOpen}
            onOpenChange={setCsvEditDialogOpen}
            trigger={<Button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋CSVファイルで一括編集</Button>}
            title="社員名簿一括編集"
            description={<ol className="mb-2 text-sm leading-relaxed list-decimal list-inside"><li className="mb-1">社員名簿のエクスポート<br /><span className="text-xs text-gray-500">まず「社員名簿エクスポート」ボタンをクリックし、社員名簿CSVファイルをダウンロードします。</span></li><li className="mb-1">CSVファイルの編集<br /><span className="text-xs text-gray-500">ダウンロードしたCSVファイルを開き、指定のフォーマットに従って社員情報を編集してください。</span></li><li>編集後のCSVファイルのアップロード<br /><span className="text-xs text-gray-500">編集が完了したCSVファイルをアップロードすることで、社員名簿を一括更新できます。</span></li></ol>}
            templateLabel="社員名簿エクスポート"
            onTemplateDownload={() => alert('エクスポート（ダミー）')}
            onImport={handleEditUpdate}
            importButtonLabel="情報更新"
            notes={[
              '※.CSVファイルから一度に最大5000までの社員名簿を編集することができます。',
              '※アップロードいただいたデータがすべて同一の場合、既に存在しているデータとなり登録失敗となります。',
              '※重複している名前、電話番号が存在する場合、アップロード確認時にアラートが表示されます。',
              '※システムはCSVファイルに記載された情報を確認し、正しい情報のみを更新し古い情報は削除します。',
            ]}
            accept=".csv"
          />
        </div>
        <Table className="w-full text-sm mb-4">
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>名前</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>名前（カナ）</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>電話番号</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>部門</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>追加確認内容</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>グループ</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>ステータス</TableHead>
              <TableHead className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ClickableTableRow href="/members/2981">
              <TableCell className="py-2 px-3 text-center">安藤 太紀</TableCell>
              <TableCell className="py-2 px-3 text-center">アンドウ ダイキ</TableCell>
              <TableCell className="py-2 px-3 text-center">08093702122</TableCell>
              <TableCell className="py-2 px-3 text-center">経営部</TableCell>
              <TableCell className="py-2 px-3 text-center">-</TableCell>
              <TableCell className="py-2 px-3 text-center">-</TableCell>
              <TableCell className="py-2 px-3 text-center"><span className="rounded px-2 py-1 text-xs" style={{ background: '#EEF4FF', color: '#5B7FFF', border: '1px solid #5B7FFF' }}>着信可</span></TableCell>
              <TableCell className="py-2 px-3 text-center" onClick={e => { e.stopPropagation(); router.push('/members/2981/edit'); }}>
                <button className="rounded px-2 py-1" style={{ background: '#5B7FFF', color: '#fff' }}>編集</button>
              </TableCell>
            </ClickableTableRow>
          </TableBody>
        </Table>
      </div>
      <footer className="w-full text-xs text-gray-500 text-center mt-8 pb-4">
        AI 電話番 V1.8.0.4 | Copyright © 2025 Enginee Co., Ltd , All Rights Reserved | AI 電話番
      </footer>
    </div>
  );
} 