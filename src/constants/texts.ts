// 請求詳細画面用テキスト定数
export const BILLING_TEXTS = {
  title: "ご請求：2025-07（06月利用分）",
  status: "6月の社員名簿の利用状況",
  memberCountLabel: "人（請求対象：",
  targetCountLabel: "人）",
  detailButton: "請求対象詳細",
  budgetTitle: "6月の従量課金予算上限",
  budgetNote: "※予算上限の設定はAI会話料のみが対象となります",
  budgetWarning: "* 予算上限の設定はAI会話料のみが対象となります",
  table: {
    usage: "利用状態",
    detail: "明細",
    qty: "数量",
    unit: "単位",
    price: "単価（円）",
    amount: "金額（円）",
    subtotal: "小計",
    tax: "消費税",
    total: "合計"
  },
  edit: "編集",
  delete: "削除"
};

export const HOME_TEXTS = {
  noticeTitle: "お知らせ",
  notices: [
    "2024/06/15　新機能「シナリオ複製」リリース！",
    "2024/06/10　UIデザインをリニューアルしました。",
    "2024/06/01　AI電話番号の利用状況がグラフで見られるようになりました。"
  ],
  guideTitle: "使い方ガイド",
  guides: [
    "左のメニューから各機能にアクセスできます。",
    "「シナリオ」ではAI応答の流れを自由に設計できます。",
    "「通話履歴」から過去のAI応答内容を確認できます。"
  ]
};

export const NUMBERS_TEXTS = {
  pageTitle: "AI電話番号",
  demoStatus: "デモ利用中",
  table: {
    id: "ID",
    status: "ステータス",
    number: "電話番号",
    inAction: "営業時間内の動作",
    validPeriod: "有効日",
    businessHours: "営業時間",
    outAction: "営業時間外の動作"
  },
  dialog: {
    title: "稼働時間設定",
    alert: "30日間の無料デモ用AI電話番号では、セリフの変更やチャットとの連携を体験いただけます。転送機能をお試ししたいには、プランのご契約が必要です。",
    mode24: "24時間稼働",
    modeCustom: "稼働時間設定",
    period: "稼働時期",
    validDays: "有効日",
    businessTime: "稼働時間",
    inAction: "稼働時間内の動作",
    outAction: "稼働時間外の動作",
    reflect: "設定を反映する"
  }
};

export const NUMBER_DETAIL_TEXTS = {
  pageTitle: (number: string) => `デモ利用中電話 ${number} 詳細`,
  info: {
    basic: "基本情報",
    scenario: "稼働時間・シナリオ設定",
    history: "利用履歴"
  },
  table: {
    id: "電話番号ID",
    status: "ステータス",
    number: "電話番号",
    fee: "利用料金",
    applicant: "申請者",
    appliedAt: "申請日",
    contractStart: "契約開始日",
    workMode: "稼働モード",
    workPeriod: "稼働時期",
    workDays: "有効日",
    workTime: "稼働時間",
    inAction: "稼働時間内の動作",
    outAction: "稼働時間外の動作"
  },
  edit: "編集",
  save: "保存",
  cancel: "キャンセル",
  alert: "30日間の無料デモ用AI電話番号では、セリフの変更やチャットとの連携を体験いただけます。転送機能をお試ししたいには、プランのご契約が必要です。",
  logTable: {
    date: "日付",
    action: "アクション",
    scenario: "関連シナリオ",
    updater: "更新者"
  }
};

export const BILLING_LIST_TEXTS = {
  pageTitle: "ご請求",
  latestInfo: "最新のご利用基本情報",
  edit: "編集",
  editDialog: {
    title: "ご請求編集",
    company: "ご請求会社名",
    email: "請求書の送付先メールアドレス",
    cc: "請求書のCC宛先",
    address: "ご請求住所",
    phone: "電話番号",
    cancel: "キャンセル",
    save: "保存",
    alert: "請求代行会社：株式会社ネットプロテクションズ（NP掛け払い）<br />請求書送付方法：メール"
  },
  table: {
    id: "ご請求ID",
    month: "ご利用年月",
    amount: "ご利用金額（円/税込）",
    budget: "当月分の従量課金予算上限（円/税抜）",
    action: "操作",
    detail: "内訳"
  },
  memberTable: {
    name: "名前",
    department: "部門",
    time: "着信可設定の時間"
  },
  targetDetail: "請求対象詳細",
  targetDialog: {
    title: "当月現時点の社員名簿の請求対象"
  }
};

export const MEMBERS_LIST_TEXTS = {
  pageTitle: "社員名簿",
  newButton: "＋新規作成",
  csvCreate: "＋CSVファイルで一括作成",
  csvEdit: "＋CSVファイルで一括編集",
  table: {
    name: "名前",
    kana: "名前（カナ）",
    phone: "電話番号",
    department: "部門",
    extra: "追加確認内容",
    group: "グループ",
    status: "ステータス",
    action: "操作"
  },
  edit: "編集",
  statusOk: "着信可"
};

export const HOLIDAYS_LIST_TEXTS = {
  pageTitle: "祝日一覧",
  newButton: "＋新規作成",
  table: {
    date: "日付",
    dayOfWeek: "曜日",
    name: "祝日名",
    note: "備考",
    action: "操作"
  },
  edit: "編集",
  delete: "削除",
  pagination: {
    rowsPerPage: "1ページ表示行数:",
    rows: "行"
  }
};

export const EXTERNALS_LIST_TEXTS = {
  pageTitle: "社外名簿",
  newButton: "＋新規作成",
  csvCreate: "＋CSVファイルで一括作成",
  table: {
    name: "氏名",
    phone: "電話番号",
    company: "会社名",
    department: "部門"
  }
};

export const SIDEBAR_TEXTS = {
  logo: "AI 電話番",
  menu: [
    "ホーム",
    "AI電話番号",
    "シナリオ",
    "社員名簿",
    "社外名簿",
    "祝日一覧",
    "通話履歴",
    "ご請求",
    "設定"
  ],
  expand: "展開",
  collapse: "折りたたみ"
};

export const TOPBAR_TEXTS = {
  feedback: "ご意見・ご要望",
  contact: "お問い合わせ",
  faq: "よくあるご質問",
  notification: "通知",
  notifications: [
    "2024/06/15　新機能「シナリオ複製」リリース！",
    "2024/06/10　UIデザインをリニューアルしました。",
    "2024/06/01　AI電話番号の利用状況がグラフで見られるようになりました。"
  ],
  seeAll: "すべての通知を見る",
  user: "安藤　太紀様",
  profile: "プロフィール",
  logout: "ログアウト"
};

export const EXTERNAL_EDIT_TEXTS = {
  pageTitle: "社外名簿編集",
  newPageTitle: "社外名簿新規",
  basicInfo: "基本情報",
  history: "作成履歴",
  save: "保存",
  addNew: "新規社外連絡先を追加する",
  table: {
    date: "日付",
    action: "アクション",
    status: "ステータス",
    updater: "更新者"
  }
};

export const LOGS_TEXTS = {
  pageTitle: "通話履歴",
  allNumbers: "全てのAI番号",
  download: "ダウンロード(最大5000件)",
  keyword: "キーワード",
  detailSearch: "詳細検索"
};

export const MEMBER_DETAIL_TEXTS = {
  pageTitle: "社員名簿詳細",
  editPageTitle: "社員名簿編集",
  newPageTitle: "社員名簿新規",
  addNew: "新規ユーザーにメール送信し追加する",
  basicInfo: "基本情報",
  history: "作成履歴",
  edit: "編集",
  save: "保存",
  table: {
    name: "名前",
    kana: "名前（カタカナ）",
    phone: "着信先電話番号",
    email: "メールアドレス",
    department: "部署",
    position: "役職",
    account: "アカウント種別",
    chatSend: "全内容を専用チャットに送信",
    mailSend: "全内容のメール送信",
    status: "ステータス",
    group: "所属グループ",
    note: "備考",
    date: "日付",
    action: "アクション",
    updater: "更新者"
  }
};

export const SCENARIO_TEXTS = {
  pageTitle: "シナリオ",
  newPageTitle: "シナリオ新規作成",
  editPageTitle: "シナリオ編集",
  detailPageTitle: "シナリオ詳細",
  newButton: "＋新規作成",
  importButton: "＋インポート",
  basicSettings: "基本設定",
  conversationFlow: "会話詳細フロー",
  save: "保存",
  cancel: "キャンセル",
  copy: "複製",
  copyDialog: {
    title: "シナリオコピー",
    confirm: (company: string) => company ? `${company}のシナリオをコピーしますか？` : "このシナリオをコピーしますか？",
    cancel: "キャンセル",
    copy: "コピー"
  },
  importDialog: {
    title: "シナリオインポート",
    description: ".scenarioファイルをドラッグ＆ドロップまたは選択してください。インポート後、シナリオ一覧に追加されます。",
    templateLabel: ".scenarioテンプレートをダウンロード",
    importButton: "インポート",
    notes: [
      "※.scenarioファイルのみインポート可能です。",
      "※インポートしたシナリオは一覧に追加されます。"
    ]
  },
  table: {
    company: "会社名",
    callerName: "相手の名前",
    staff: "担当者",
    purpose: "要件",
    callback: "折り返し希望",
    callbackNumber: "折り返し先電話番号",
    aiNumber: "AI電話番号",
    createdAt: "作成日",
    action: "操作"
  }
};

export const HOLIDAY_TEXTS = {
  editPageTitle: "祝日編集",
  detailPageTitle: "祝日詳細",
  basicSettings: "基本設定",
  save: "保存",
  table: {
    name: "祝日名",
    date: "日付",
    note: "備考"
  }
};

export const SETTINGS_TEXTS = {
  pageTitle: "設定",
  orgInfo: "組織情報",
  ipRestriction: "IP制限",
  newButton: "＋新規作成",
  keyword: "キーワード",
  detailSearch: "詳細検索"
};

export const PROFILE_TEXTS = {
  pageTitle: "社員名簿詳細",
  basicInfo: "基本情報",
  history: "作成履歴",
  table: {
    name: "名前",
    kana: "名前（カタカナ）",
    phone: "着信先電話番号",
    email: "メールアドレス",
    department: "部署",
    position: "役職",
    account: "アカウント種別",
    chatSend: "全内容を専用チャットに送信",
    mailSend: "全内容のメール送信",
    status: "ステータス",
    group: "所属グループ",
    note: "備考",
    date: "日付",
    action: "アクション",
    updater: "更新者"
  }
};

export const CSV_IMPORT_DIALOG_TEXTS = {
  cancel: "キャンセル",
  uploadText: "アップロードするファイルを選択",
  dragDropText: "またはファイルをドラッグ＆ドロップします",
  selectedFile: "選択中:",
  selectFile: "ファイルを選択してください"
};

export const FOOTER_TEXTS = {
  version: "AI 電話番 V1.8.0.4",
  copyright: "Copyright © 2025 Enginee Co., Ltd , All Rights Reserved",
  brand: "AI 電話番"
}; 