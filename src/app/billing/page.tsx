import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ClickableTableRow } from '@/components/ClickableTableRow';

interface BillingInfoProps {
  label: string;
  value: string | React.ReactNode;
}

function BillingInfo({ label, value }: BillingInfoProps) {
  return (
    <div className="mb-2">
      <span className="font-medium">{label}：</span>
      <span>{value}</span>
    </div>
  );
}

interface BillingTableProps {
  data: {
    id: string;
    month: string;
    amount: string;
    budget: string;
  }[];
}

function BillingTable({ data }: BillingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">ご請求ID</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">ご利用年月</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">ご利用金額（円/税込）</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">当月分の従量課金予算上限（円/税抜）</TableHead>
          <TableHead className="py-2 px-3 bg-[#5B7FFF] text-white font-semibold">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((bill, index) => (
          <ClickableTableRow key={index} href={`/billing/${index + 1}`}>
            <TableCell className={TABLE_STYLES.cell}>{bill.id}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.month}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.amount}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>{bill.budget}</TableCell>
            <TableCell className={TABLE_STYLES.cell}>
              <Button
                variant="outline"
                className="text-xs"
                style={{ color: COLORS.primary, borderColor: COLORS.primary }}
              >
                内訳
              </Button>
            </TableCell>
          </ClickableTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BillingPage() {
  const billingData = [
    {
      id: "1",
      month: "2025-07（06月利用分）",
      amount: "0（無料デモ）",
      budget: "1,000",
    },
  ];

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary }}>
        ご請求
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border }}>
        <div className="mb-6">
          <span className="block text-base font-semibold mb-2" style={{ color: COLORS.primary }}>
            最新のご利用基本情報
          </span>
          <BillingInfo label="請求会社名" value="株式会社Pactom" />
          <BillingInfo label="請求書の送付先メールアドレス" value="daikisocceta1@gmail.com" />
          <BillingInfo label="請求書のCC宛先" value="" />
          <BillingInfo label="請求住所" value="〒1600023 東京都新宿区西新宿西新宿3丁目3番13号西新宿" />
          <BillingInfo label="電話番号" value="08093702122" />
          <BillingInfo
            label="当月現時点の社員名簿の請求対象"
            value={
              <>
                1{" "}
                <Button className="ml-2 text-xs" style={{ background: COLORS.primary }}>
                  請求対象詳細
                </Button>
              </>
            }
          />
          <BillingInfo label="当月現時点のSMS配信通数" value="0通" />
          <BillingInfo label="現時点の従量課金予算上限" value="1,000円（税抜）" />
        </div>

        <div className="mb-6">
          <span className="block text-base font-semibold mb-2" style={{ color: COLORS.primary }}>
            ご請求一覧
          </span>
          <BillingTable data={billingData} />
        </div>
      </Card>
    </div>
  );
} 