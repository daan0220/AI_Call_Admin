"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Profile {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  role: string;
  account: string;
  chatSend: boolean;
  mailSend: boolean;
  status: string;
  group: string;
  note: string;
  password: string;
  passwordConfirm: string;
  history: {
    date: string;
    action: string;
    status: string;
    updater: string;
  }[];
}

export default function MemberEditPage() {
  const router = useRouter();
  const [profile] = useState<Profile>({
    name: '安藤 太紀',
    nameKana: 'アンドウ ダイキ',
    phone: '08093702122',
    email: 'daikisocceta1@gmail.com',
    department: '経営部',
    position: '代表取締役',
    role: '組織管理者',
    account: '組織管理者',
    chatSend: true,
    mailSend: true,
    status: '着信可',
    group: '',
    note: '',
    password: '',
    passwordConfirm: '',
    history: [
      {
        date: '2025-06-15 23:04:59',
        action: '社員ステータス設定',
        status: '着信可',
        updater: '安藤太紀',
      },
    ],
  });

  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className="text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿編集</h1>
      </div>

      <Card className="mb-8 p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#5B7FFF' }}>基本情報</h2>
        <Separator className="mb-4" />
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="姓" value={profile.name.split(' ')[0]} className="w-1/2" readOnly />
              <Input placeholder="名" value={profile.name.split(' ')[1]} className="w-1/2" readOnly />
            </div>
            <div className="flex gap-2">
              <Input placeholder="セイ" value={profile.nameKana.split(' ')[0]} className="w-1/2" readOnly />
              <Input placeholder="メイ" value={profile.nameKana.split(' ')[1]} className="w-1/2" readOnly />
            </div>
            <Input placeholder="着信先電話番号" value={profile.phone} readOnly />
            <Input placeholder="メールアドレス" value={profile.email} readOnly />
            <Input placeholder="部署" value={profile.department} readOnly />
            <Input placeholder="役職" value={profile.position} readOnly />
          </div>
          <div className="space-y-4">
            <Input placeholder="アカウント権限" value={profile.account} readOnly />
            <div className="flex items-center gap-2">
              <label>サービス連携専用チャットに送信</label>
              <Input type="checkbox" checked={profile.chatSend} readOnly />
            </div>
            <div className="flex items-center gap-2">
              <label>全内容のメール送信先</label>
              <Input type="checkbox" checked={profile.mailSend} readOnly />
            </div>
            <div className="flex items-center gap-2">
              <label>ステータス</label>
              <Input value={profile.status} readOnly />
            </div>
            <Input placeholder="所属グループ" value={profile.group} readOnly />
            <Input placeholder="新しいパスワード" value={profile.password} type="password" readOnly />
            <Input placeholder="新しいパスワード（確認）" value={profile.passwordConfirm} type="password" readOnly />
            <Input placeholder="備考" value={profile.note} readOnly />
          </div>
          <div className="col-span-2 flex justify-center mt-6">
            <Button style={{ background: '#22C55E', color: '#fff', width: 200 }}>保存</Button>
          </div>
        </form>
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
              {profile.history.map((h, i) => (
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