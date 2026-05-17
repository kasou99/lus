# AGENTS.md - このプロジェクトのためのCodex指示

## プロジェクト概要
（何を作ってるか、技術スタック、目的を簡潔に）

## 開発環境・コマンド
- インストール: `npm install` または `pnpm install`
- ビルド: `npm run build`
- テスト: `npm test`（必ず通すこと）
- 起動: `npm run dev`

## コーディング規約
- TypeScript厳格モード
- 命名規則: camelCase / PascalCase
- エラー処理は必ずtry-catch or Result型
- テストは必ず書く（カバレッジ80%以上目安）

## Done基準
- テスト全通過
- lint/esbuild通る
- セキュリティチェック（secret漏れなし）
- PR説明に変更点・理由を明記

## 禁止事項
- 使わないライブラリ一覧
- セキュリティポリシー
