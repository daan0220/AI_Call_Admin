"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { MEMBER_DETAIL_TEXTS } from '@/constants/texts';

type ProfileHistory = {
  date: string;
  action: string;
  status: string;
  updater: string;
};

type Profile = {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  role: string;
  account: string;
  chatSend: string;
  mailSend: string;
  status: string;
  group: string;
  note: string;
  history: ProfileHistory[];
};

const dummyProfiles: Record<string, Profile> = {
  '2981': {
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
    history: [
      {
        date: '2025-06-15 23:04:59',
        action: '社員ステータス設定',
        status: '着信可',
        updater: '安藤太紀',
      },
    ],
  },
};

export default function MemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const profile = dummyProfiles[id] || dummyProfiles['2981'];
  const history = profile.history;

  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className="text-2xl font-bold" style={{ color: '#5B7FFF' }}>{MEMBER_DETAIL_TEXTS.pageTitle}</h1>
      </div>

      <Card className="mb-8 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#5B7FFF' }}>{MEMBER_DETAIL_TEXTS.basicInfo}</h2>
          <Button style={{ background: '#00D2FF', color: '#fff' }}>{MEMBER_DETAIL_TEXTS.edit}</Button>
        </div>
        <Separator className="mb-4" />
        <div className="overflow-x-auto">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold w-56">{MEMBER_DETAIL_TEXTS.table.name}</TableCell>
                <TableCell>{profile.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.kana}</TableCell>
                <TableCell>{profile.nameKana}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.phone}</TableCell>
                <TableCell>{profile.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.email}</TableCell>
                <TableCell>{profile.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.department}</TableCell>
                <TableCell>{profile.department}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.position}</TableCell>
                <TableCell>{profile.position}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.account}</TableCell>
                <TableCell>{profile.account}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.chatSend}</TableCell>
                <TableCell>{profile.chatSend}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.mailSend}</TableCell>
                <TableCell>{profile.mailSend}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.status}</TableCell>
                <TableCell>{profile.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.group}</TableCell>
                <TableCell>{profile.group}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-[#F5F4FF] font-semibold">{MEMBER_DETAIL_TEXTS.table.note}</TableCell>
                <TableCell>{profile.note}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#5B7FFF' }}>{MEMBER_DETAIL_TEXTS.history}</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#7C6CF6] text-white">
                <TableHead className="text-white">{MEMBER_DETAIL_TEXTS.table.date}</TableHead>
                <TableHead className="text-white">{MEMBER_DETAIL_TEXTS.table.action}</TableHead>
                <TableHead className="text-white">{MEMBER_DETAIL_TEXTS.table.status}</TableHead>
                <TableHead className="text-white">{MEMBER_DETAIL_TEXTS.table.updater}</TableHead>
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