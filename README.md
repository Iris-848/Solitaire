# Solitaire

ブラウザで動作するソリティア（Solitaire）です。  
HTML / CSS / JavaScript のみで構成された、Webサイトで動く小さなゲームプロジェクトです。

## デモ
https://iris-848.github.io/Solitaire

## 動作環境
- Google Chrome / Microsoft Edge / Safari
  にて動作確認済み

## 使用技術・ライブラリ

### Fonts
- Google Fonts  
  - Playfair Display  
  UIの雰囲気作りのために使用。

### Icons
- Font Awesome  
  ボタンやUIアイコン表示に使用。

### Animation
- canvas-confetti  
  ゲームクリア時の演出（紙吹雪）に使用。

### Interaction
- interact.js  
  カードのドラッグ＆ドロップ操作に使用。

## 使用画像

- icon.jpg  
  アイコン画像。Procreateを使用した自作画像。

- trump/  
  カード画像。フリー素材を使用。

## 操作方法・ルール

- ロシアンソリティアのロジックを採用
- STARTボタンをクリックしてゲーム開始
- 上部の組札には、同じマークのカードを「1」から順に自動で配置される
- 各列の最後尾のカードへ  
  「数字が1つ小さい」かつ「同じマーク」のカードを移動可能
- 空になった列には K のカードを配置可能
- すべての列が空になるとゲームクリア

## 機能

- タイマー
- 休止 / 再開
- 自動カード移動
- 詰み判定（コンソールログに表示）
- BGM の ON / OFF
- ダークモード切り替え
