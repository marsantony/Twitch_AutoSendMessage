# Twitch_AutoSendMessage

Twitch 自動發送 GP 忠誠點數工具 ── 載入 Excel 名單，批次發送 `!ggp` 指令給指定帳號。

## 線上使用

**https://marsantony.github.io/Twitch_AutoSendMessage/**

## 功能

- **Excel 名單匯入** ── 上傳包含帳號名單的 Excel 檔案
- **批次自動發送** ── 依序對每個帳號發送 `!ggp {帳號} 3000` 指令
- **間隔控制** ── 每筆間隔 3 秒，避免發送過快被限制
- **結果報表** ── 完成後自動下載 Excel 報表，記錄已發送的帳號

## 使用方式

1. 輸入 Twitch 帳號與 [OAuth Token](https://twitchtokengenerator.com/)（Bot Chat Token）
2. 上傳忠誠點數換 GP 的 Excel 名單
3. 點擊「開始自動發話」
4. 完成後自動下載結果報表

## 技術

- [tmi.js](https://github.com/tmijs/tmi.js) ── Twitch IRC 連線
- [SheetJS (xlsx)](https://sheetjs.com/) ── Excel 讀取與匯出
- [Moment.js](https://momentjs.com/) ── 時間格式化
- Bootstrap 5 ── UI 介面
- LocalStorage ── 記住帳號密碼設定
