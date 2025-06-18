"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Info } from 'lucide-react';

export interface ExternalContactFormValues {
  name: string;
  nameKana: string;
  phoneNumber: string;
  company: string;
  department: string;
  note: string;
}

interface ExternalContactFormProps {
  initialValues?: Partial<ExternalContactFormValues>;
  onSubmit?: (values: ExternalContactFormValues) => void;
  submitLabel?: string;
}

const labelClass = "flex items-center gap-1 text-base font-semibold text-[#3B3172]";
const leftCellClass = "md:col-span-3 bg-[#F5F6FB] p-4 border-b md:border-b-0 md:border-r min-h-[56px]";
const rightCellClass = "md:col-span-9 p-4 border-b md:border-b-0 min-h-[56px] flex items-center";
const requiredMark = <span className="text-red-500 ml-1">*</span>;
const infoIcon = <Info size={16} className="text-[#A39BD3] ml-1" />;

export function ExternalContactForm({ initialValues = {}, onSubmit, submitLabel = "保存" }: ExternalContactFormProps) {
  const [values, setValues] = useState<ExternalContactFormValues>({
    name: initialValues.name || "",
    nameKana: initialValues.nameKana || "",
    phoneNumber: initialValues.phoneNumber || "",
    company: initialValues.company || "",
    department: initialValues.department || "",
    note: initialValues.note || "",
  });

  const handleChange = (key: keyof ExternalContactFormValues, value: string) => {
    setValues(v => ({ ...v, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#5B7FFF' }}>社外連絡先情報</h2>
      <Separator className="mb-4" />
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border rounded-xl overflow-hidden" style={{ borderColor: '#E0E0F0' }}>
          {/* 名前 */}
          <div className={`${leftCellClass} ${labelClass}`}>名前{requiredMark}</div>
          <div className={rightCellClass}>
            <Input placeholder="氏名" value={values.name} onChange={e => handleChange('name', e.target.value)} required />
          </div>
          {/* 名前カナ */}
          <div className={`${leftCellClass} ${labelClass}`}>名前（カタカナ）{requiredMark}</div>
          <div className={rightCellClass}>
            <Input placeholder="カタカナ" value={values.nameKana} onChange={e => handleChange('nameKana', e.target.value)} required />
          </div>
          {/* 電話番号 */}
          <div className={leftCellClass + " " + labelClass}>電話番号<span className="text-xs text-[#A39BD3] ml-1">{infoIcon} ハイフン抜きで入力してください</span>{requiredMark}</div>
          <div className={rightCellClass}>
            <Input placeholder="ハイフン抜きで入力してください" value={values.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} required />
          </div>
          {/* 会社名 */}
          <div className={`${leftCellClass} ${labelClass}`}>会社名{requiredMark}</div>
          <div className={rightCellClass}>
            <Input value={values.company} onChange={e => handleChange('company', e.target.value)} required />
          </div>
          {/* 部門名 */}
          <div className={`${leftCellClass} ${labelClass}`}>部門名</div>
          <div className={rightCellClass}>
            <Input value={values.department} onChange={e => handleChange('department', e.target.value)} />
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
    </div>
  );
} 