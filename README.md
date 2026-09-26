# 押上 半蔵門線 時刻表 — 静的PWA

平日朝の手入力データ55本で動く非公式アプリです。外部時刻表の取得、ODPT、Supabase、Cron、広告、解析SDKは使用しません。ビルド・依存パッケージ・環境変数は不要です。

## 収録データと表示

- 既存公開アプリ https://takkuncode0714.github.io/oshiage-hanzomon/ から、手入力済み55本を変更せず引き継ぎました。回収日：2026-09-24。
- 平日 07:03〜10:20。発車時刻、行先、番線、押上始発を収録。**ダイヤの適用日と現行ダイヤとの一致は未確認**です。公開前に手元の資料で確認してください。
- 土休日、早朝・昼・夜は未登録です。データがないことを明示し、「終電」や「運行終了」とは表示しません。
- 日本時間で発車前の最大10本を表示。発車時刻ちょうどを過ぎた列車は除外します。15秒ごと・画面復帰時・更新ボタンで再計算します。「更新」は外部データ取得ではありません。
- 土日の起動時のみ土・休日を初期選択。祝日・振替休日・臨時ダイヤは自動判定しません。ダイヤ選択を確認してください。
- 帰りの return.html は押上→京成立石の外部検索ショートカットです。Google マップは駅を指定。NAVITIMEは乗換検索の入口を開き、駅名を手動入力します。

## GitHub / Vercelに設置

1. ZIPを解凍し、index.html がリポジトリ直下になるよう全ファイルを配置します。
2. 既存リポジトリの場合は作業前にバックアップし、同名ファイルを置換してコミットします。このZIPにない古いAPI・Cronなどは自動削除されません。以前追加していた場合は別途無効化し、不要になったキーを削除してください。
3. VercelにGitHubリポジトリを接続済みなら、そのコミットをデプロイします。Framework Preset は Other、ビルドコマンドは空、出力先は .（プロジェクト直下）。vercel.json に設定済みです。
4. HTTPSの公開URLで /index.html、/return.html、/privacy.html、/manifest.webmanifest、/icon-512.png を確認します。
5. Android Chromeでホーム画面追加・オフライン再起動を確認します。初回閲覧時にキャッシュが完了してから一度再読み込みすると、その後のオフライン表示を確認できます。

GitHub Pagesも利用可能です。mainブランチのルートを公開してください。相対パスなので /oshiage-hanzomon/ のようなサブディレクトリにも対応します。.nojekyll も含めて配置してください。

## 手入力データの編集

timetable.js の window.TIMETABLE_DATA.weekday / holiday 配列を編集します。

例：{ "departureTime": "08:09", "destination": "長津田", "platform": "3", "startsHere": true }

時刻は00:00〜23:59、番線は文字列、startsHereはtrue/falseです。重複や誤記がないことを確認し、時刻順に並べてください。現在の実装は日付をまたぐ24時以降表記には対応しません。
収録範囲・本数を変えたら index.html と store-listing.md の説明も修正します。適用日を確認できた場合は validFrom と画面の注意書きを更新します。

## アプリの更新

ファイル変更時は必ず sw.js の VERSION も変更してください。アプリは一式を同じバージョンでキャッシュします。新版の保存完了後に「新版を適用」が表示され、押すと再起動します。複数タブで開いている場合は各タブを再読み込みしてください。通信が切れた状態では新版を受信できません。
キャッシュ名には公開先のscopeを含め、他のアプリのキャッシュは削除しません。

## Google Play準備

このZIPはPWAのソースと掲載準備素材です。**署名済みAABとストアへの申請は含みません。**

1. 本番のHTTPS URLを確定します。
2. privacy.html の連絡先案内に対応する、実際に連絡が取れるサポートメールをストア掲載情報に設定します。必要ならポリシーに運営者名・連絡先を追記します。
3. https://www.pwabuilder.com/ に本番URLを入力してPWAを確認し、Android用パッケージを生成します。実際のパッケージ名と署名鍵を決め、鍵を安全に保管します。
4. play-preparation/assetlinks.example.json の2か所を実値へ置換し、本番ドメインの /.well-known/assetlinks.json として配置します。SHA-256はPlay App Signingのアプリ署名証明書を使用します。手元のテスト用署名が異なる場合はその指紋も追加します。テンプレートをそのまま公開しないでください。
5. Google Play ConsoleでAABを登録し、ストア掲載文・プライバシーポリシーURL・サポート連絡先・画像を設定します。play-icon-512.png と play-preparation/feature-graphic.png を同梱しています。
6. 実機で撮影した画面を掲載用に用意します。このZIPのプレビュー画像はブラウザでの確認用で、実機確認の代わりにはなりません。
7. Data safety、広告、対象年齢、コンテンツレーティング等を実際の配布形態に基づいて回答し、Consoleが示すテスト・本人確認・対象API要件を満たして申請します。現在のWebコードには個人情報収集SDKはありませんが、追加するAndroid機能や配信設定も確認してください。

## ファイル

index.html / return.html / privacy.html：ページ
styles.css / app.js / logic.js：表示と日本時間の計算
timetable.js：手入力データ
manifest.webmanifest / sw.js / pwa.js：インストール・オフライン・更新
icon-192.png / icon-512.png / icon-maskable-512.png / apple-touch-icon.png：アイコン
play-icon-512.png / play-preparation/：ストア準備
vercel.json / .nojekyll：配信設定
store-listing.md：掲載文

## 参考資料

- Vercel設定：https://vercel.com/docs/project-configuration/vercel-json
- TWAとドメインの関連付け：https://developer.chrome.com/docs/android/trusted-web-activity/integration-guide
- Play掲載画像：https://support.google.com/googleplay/android-developer/answer/9866151?hl=ja

資料確認日：2026-09-24。ストア側の要件は申請時のConsoleの案内を確認してください。

