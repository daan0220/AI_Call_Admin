"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EntityDetailActions } from '@/components/common/EntityDetailActions';
import { DeleteEntityDialog } from '@/components/common/DeleteEntityDialog';
import { useState } from 'react';

const profile = {
  name: '安藤 太紀',
  nameKana: 'アンドウ ダイキ',
  phone: '08093702122',
  email: 'daikisocceta1@gmail.com',
  department: '経営部',
  position: '代表取締役',
  role: '組織管理者',
  account: '組織管理者',
  chatSend: '○',
  mailSend: '○',
  status: '着信可',
  group: '',
  note: '',
};

const history = [
  {
    date: '2025-06-15 23:04:59',
    action: '社員ステータス設定',
    status: '着信可',
    updater: '安藤太紀',
  },
];

function EmployeeDetailTable({ employee }: { employee: typeof profile }) {
  return (
    <Table className="mb-0 text-base bg-white rounded-xl border">
      <TableBody>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold w-56">名前</TableCell><TableCell>{employee.name}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">名前（カタカナ）</TableCell><TableCell>{employee.nameKana}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">着信先電話番号</TableCell><TableCell>{employee.phone}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">メールアドレス</TableCell><TableCell>{employee.email}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">部署</TableCell><TableCell>{employee.department}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">役職</TableCell><TableCell>{employee.position}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">アカウント種別</TableCell><TableCell>{employee.account}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">全内容を専用チャットに送信</TableCell><TableCell>{employee.chatSend}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">全内容のメール送信</TableCell><TableCell>{employee.mailSend}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">ステータス</TableCell><TableCell>{employee.status}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">所属グループ</TableCell><TableCell>{employee.group}</TableCell></TableRow>
        <TableRow><TableCell className="bg-[#F5F4FF] font-semibold">備考</TableCell><TableCell>{employee.note}</TableCell></TableRow>
      </TableBody>
    </Table>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleEdit = () => {/* 編集ページ遷移 */};
  const handleDelete = () => setDeleteDialogOpen(true);
  const handleDeleteConfirm = () => { setDeleteDialogOpen(false); router.back(); };
  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className="text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿詳細</h1>
      </div>
      <Card className="mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#5B7FFF' }}>基本情報</h2>
          <EntityDetailActions onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <Separator className="mb-4" />
        <div className="overflow-x-auto">
          <EmployeeDetailTable employee={profile} />
        </div>
        <DeleteEntityDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} entityName={profile.name} onDelete={handleDeleteConfirm} onCancel={() => setDeleteDialogOpen(false)} />
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#5B7FFF' }}>作成履歴</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#7C6CF6] text-white">
                <TableHead className="text-white">日付</TableHead>
                <TableHead className="text-white">アクション</TableHead>
                <TableHead className="text-white">ステータス</TableHead>
                <TableHead className="text-white">更新者</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h, i) => (
                <TableRow key={i}>
                  <TableCell>{h.date}</TableCell>
                  <TableCell>{h.action}</TableCell>
                  <TableCell>{h.status}</TableCell>
                  <TableCell>{h.updater}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
} 