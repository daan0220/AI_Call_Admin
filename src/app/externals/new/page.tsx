"use client";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { COLORS } from '@/constants/styles';
import { ChevronLeft } from 'lucide-react';

export default function ExternalNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    lastKana: '',
    firstKana: '',
    phone: '',
    email: '',
    company: '',
    companyKana: '',
    department: '',
    action: '',
    note: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelect = (value: string) => {
    setForm({ ...form, action: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('保存しました（ダミー）');
    router.push('/externals');
  };
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6 text-[#5B7FFF]" />
        </Button>
        <h1 className="mb-8 text-2xl font-bold" style={{ color: '#5B7FFF' }}>社外名簿新規</h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">名前<span className="text-red-500 ml-1">*</span></label>
                <div className="flex gap-2">
                  <Input name="lastName" placeholder="姓" value={form.lastName} onChange={handleChange} required />
                  <Input name="firstName" placeholder="名" value={form.firstName} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">名前カタカナ<span className="text-red-500 ml-1">*</span></label>
                <div className="flex gap-2">
                  <Input name="lastKana" placeholder="セイ" value={form.lastKana} onChange={handleChange} required />
                  <Input name="firstKana" placeholder="メイ" value={form.firstKana} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">電話番号<span className="text-red-500 ml-1">*</span></label>
                <Input name="phone" placeholder="ハイフン抜きで入力してください" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">メールアドレス</label>
                <Input name="email" value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">会社名</label>
                <Input name="company" value={form.company} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">会社名カタカナ</label>
                <Input name="companyKana" value={form.companyKana} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">部門名</label>
                <Input name="department" value={form.department} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">着信時の動作</label>
                <Select value={form.action} onValueChange={handleSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="電話番号に設定済みのシナリオに従う" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">電話番号に設定済みのシナリオに従う</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">備考</label>
                <Textarea name="note" value={form.note} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button type="submit" className="w-64 text-base font-bold" style={{ background: '#22C55E' }}>保存</Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 