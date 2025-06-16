"use client";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Info } from 'lucide-react';

export interface MemberFormValues {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
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
  mailDest: string;
  callViewScope: string;
}

interface MemberFormProps {
  initialValues?: Partial<MemberFormValues>;
  onSubmit?: (values: MemberFormValues) => void;
  submitLabel?: string;
}

const departments = ["経営部", "営業部", "開発部", "サポート部"];
const groups = ["Aグループ", "Bグループ", "Cグループ"];

const labelClass = "flex items-center gap-1 text-base font-semibold text-[#3B3172]";
const leftCellClass = "md:col-span-3 bg-[#F5F6FB] p-4 border-b md:border-b-0 md:border-r min-h-[56px]";
const rightCellClass = "md:col-span-9 p-4 border-b md:border-b-0 min-h-[56px] flex items-center";
const requiredMark = <span className="text-red-500 ml-1">*</span>;
const infoIcon = <Info size={16} className="text-[#A39BD3] ml-1" />;

export function MemberForm({ initialValues = {}, onSubmit, submitLabel = "保存" }: MemberFormProps) {
  const [values, setValues] = useState<MemberFormValues>({
    lastName: initialValues.lastName || "",
    firstName: initialValues.firstName || "",
    lastNameKana: initialValues.lastNameKana || "",
    firstNameKana: initialValues.firstNameKana || "",
    phone: initialValues.phone || "",
    email: initialValues.email || "",
    department: initialValues.department || "",
    position: initialValues.position || "",
    role: initialValues.role || "一般ユーザー",
    account: initialValues.account || "一般ユーザー",
    chatSend: initialValues.chatSend ?? false,
    mailSend: initialValues.mailSend ?? false,
    status: initialValues.status || "着信可",
    group: initialValues.group || "",
    note: initialValues.note || "",
    mailDest: initialValues.mailDest || "",
    callViewScope: initialValues.callViewScope || "本人の通話のみ",
  });
  const [chatText, setChatText] = useState("");

  const handleChange = (key: keyof MemberFormValues, value: string | boolean) => {
    setValues(v => ({ ...v, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <Card className="mb-8 p-8 rounded-2xl shadow border-[#E0E0F0]" style={{ borderWidth: 1 }}>
      <h2 className="text-xl font-bold mb-6" style={{ color: '#3B3172' }}>基本情報</h2>
      <Separator className="mb-4" />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border rounded-xl overflow-hidden" style={{ borderColor: '#E0E0F0' }}>
          {/* 名前 */}
          <div className={`${leftCellClass} ${labelClass}`}>名前{requiredMark}</div>
          <div className={rightCellClass + " gap-2"}>
            <Input placeholder="姓" value={values.lastName} onChange={e => handleChange('lastName', e.target.value)} className="w-1/3" required />
            <Input placeholder="名" value={values.firstName} onChange={e => handleChange('firstName', e.target.value)} className="w-1/3" required />
          </div>
          {/* 名前カナ */}
          <div className={`${leftCellClass} ${labelClass}`}>名前（カタカナ）{requiredMark}</div>
          <div className={rightCellClass + " gap-2"}>
            <Input placeholder="セイ" value={values.lastNameKana} onChange={e => handleChange('lastNameKana', e.target.value)} className="w-1/3" required />
            <Input placeholder="メイ" value={values.firstNameKana} onChange={e => handleChange('firstNameKana', e.target.value)} className="w-1/3" required />
          </div>
          {/* 着信先電話番号 */}
          <div className={leftCellClass + " " + labelClass}>着信先電話番号<span className="text-xs text-[#A39BD3] ml-1">{infoIcon} ハイフン抜きで入力してください</span>{requiredMark}</div>
          <div className={rightCellClass}>
            <Input placeholder="ハイフン抜きで入力してください" value={values.phone} onChange={e => handleChange('phone', e.target.value)} required />
          </div>
          {/* メールアドレス */}
          <div className={`${leftCellClass} ${labelClass}`}>メールアドレス{requiredMark}</div>
          <div className={rightCellClass}>
            <Input value={values.email} onChange={e => handleChange('email', e.target.value)} required />
          </div>
          {/* 部門 */}
          <div className={leftCellClass + " " + labelClass}>部門</div>
          <div className={rightCellClass}>
            <Select value={values.department} onValueChange={v => handleChange('department', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {/* 役職 */}
          <div className={leftCellClass + " " + labelClass}>役職</div>
          <div className={rightCellClass}>
            <Input value={values.position} onChange={e => handleChange('position', e.target.value)} />
          </div>
          {/* アカウント権限 */}
          <div className={leftCellClass + " " + labelClass}>アカウント権限{infoIcon}{requiredMark}</div>
          <div className={rightCellClass}>
            <RadioGroup value={values.role} onValueChange={v => handleChange('role', v)} className="flex gap-8">
              <div className="flex items-center gap-2"><RadioGroupItem value="組織管理者" id="role-org" className="accent-[#7C6CF6]" /><Label htmlFor="role-org">組織管理者</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="グループ管理者" id="role-group" className="accent-[#7C6CF6]" /><Label htmlFor="role-group">グループ管理者</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="一般ユーザー" id="role-user" className="accent-[#7C6CF6]" /><Label htmlFor="role-user">一般ユーザー</Label></div>
            </RadioGroup>
          </div>
          {/* 通話履歴の閲覧範囲 */}
          <div className={leftCellClass + " " + labelClass}>通話履歴の閲覧範囲</div>
          <div className={rightCellClass}>
            <RadioGroup value={values.callViewScope} onValueChange={v => handleChange('callViewScope', v)} className="flex gap-8">
              <div className="flex items-center gap-2"><RadioGroupItem value="全て" id="scope-all" className="accent-[#7C6CF6]" /><Label htmlFor="scope-all">全て</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="グループの全て" id="scope-group" className="accent-[#7C6CF6]" /><Label htmlFor="scope-group">該当グループの全て</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="本人の通話のみ" id="scope-self" className="accent-[#7C6CF6]" /><Label htmlFor="scope-self">本人の通話のみ</Label></div>
            </RadioGroup>
          </div>
          {/* 会話内容を専用チャットに送信 */}
          <div className={leftCellClass + " " + labelClass}>会話内容を専用チャットに送信{infoIcon}</div>
          <div className={rightCellClass + " gap-2"}>
            <Input value={chatText} onChange={e => setChatText(e.target.value)} className="flex-1" placeholder="チャット内容" />
            <Button type="button" style={{ background: '#7C6CF6', color: '#fff', minWidth: 80 }}>＋追加</Button>
            <a href="#" className="text-[#7C6CF6] text-sm underline ml-2">サービス連携の設定方法について</a>
          </div>
          {/* 会話内容のメール送信先 */}
          <div className={leftCellClass + " " + labelClass}>会話内容のメール送信先{infoIcon}</div>
          <div className={rightCellClass + " flex-col items-start"}>
            <Textarea value={values.mailDest} onChange={e => handleChange('mailDest', e.target.value)} placeholder="複数のメールアドレスを入力する場合は「,」あるいはスペースで区切ります。" className="w-full min-h-[48px]" />
            <span className="text-xs text-gray-400 mt-1">複数のメールアドレスを入力する場合は「,」あるいはスペースで区切ります。</span>
          </div>
          {/* ステータス */}
          <div className={leftCellClass + " " + labelClass}>ステータス{infoIcon}</div>
          <div className={rightCellClass}>
            <RadioGroup value={values.status} onValueChange={v => handleChange('status', v)} className="flex gap-8">
              <div className="flex items-center gap-2"><RadioGroupItem value="着信可" id="status-ok" className="accent-[#7C6CF6]" /><Label htmlFor="status-ok">着信可</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="着信不可" id="status-ng" className="accent-[#7C6CF6]" /><Label htmlFor="status-ng">着信不可</Label></div>
            </RadioGroup>
          </div>
          {/* 所属グループ */}
          <div className={leftCellClass + " " + labelClass}>所属グループ{infoIcon}</div>
          <div className={rightCellClass}>
            <Select value={values.group} onValueChange={v => handleChange('group', v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {groups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {/* 備考 */}
          <div className={leftCellClass + " " + labelClass + " items-start"}>備考</div>
          <div className={rightCellClass + " flex-col items-start"}>
            <Textarea value={values.note} onChange={e => handleChange('note', e.target.value)} className="w-full min-h-[48px]" />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button type="submit" style={{ background: '#22C55E', color: '#fff', width: 320, fontSize: 18 }}>{submitLabel}</Button>
        </div>
      </form>
    </Card>
  );
} 