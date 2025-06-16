"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { ClickableTableRow } from '@/components/ClickableTableRow';

export default function MembersPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿</h1>
      <div className="rounded-xl shadow-md bg-white p-8" style={{ border: '1px solid #D6E2FF' }}>
        <div className="flex mb-4 gap-2">
          <button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋新規作成</button>
          <button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋CSVファイルで一括作成</button>
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
        AI 電話番 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 電話番 ホームページ
      </footer>
    </div>
  );
} 