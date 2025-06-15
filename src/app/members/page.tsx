export default function MembersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold" style={{ color: '#5B7FFF' }}>社員名簿</h1>
      <div className="rounded-xl shadow-md bg-white p-8" style={{ border: '1px solid #D6E2FF' }}>
        <div className="flex mb-4 gap-2">
          <button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋新規作成</button>
          <button className="rounded px-4 py-2" style={{ background: '#5B7FFF', color: '#fff' }}>＋CSVファイルで一括作成</button>
        </div>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr style={{ background: '#EEF4FF' }}>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>名前</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>名前（カナ）</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>電話番号</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>部門</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>追加確認内容</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>グループ</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>ステータス</th>
              <th className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3 text-center">安藤 太紀</td>
              <td className="py-2 px-3 text-center">アンドウ ダイキ</td>
              <td className="py-2 px-3 text-center">08093702122</td>
              <td className="py-2 px-3 text-center">経営部</td>
              <td className="py-2 px-3 text-center">-</td>
              <td className="py-2 px-3 text-center">-</td>
              <td className="py-2 px-3 text-center"><span className="rounded px-2 py-1 text-xs" style={{ background: '#EEF4FF', color: '#5B7FFF', border: '1px solid #5B7FFF' }}>着信可</span></td>
              <td className="py-2 px-3 text-center"><button className="rounded px-2 py-1" style={{ background: '#5B7FFF', color: '#fff' }}>編集</button></td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs text-gray-500">AI 営業事務 V1.8.0.4 | Copyright © 2022-2025 Softsu Co., Ltd , All Rights Reserved | AI 営業事務 ホームページ</div>
      </div>
    </div>
  );
} 