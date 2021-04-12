# d_eval

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


<!-- アプリデータ設計 -->
ShopRate(Sr)：店舗の計画値達成率 - 各項目/店舗目標
- PI販売数
    PI件数 / PI目標数

- HS/タブレット新規販売数
    HS件数 / HS目標数

- マイグレ販売数
    マイグレ件数 / マイグレ目標数

- スマホ/タブレット総販
    総販数 / 総販目標数

- dカード申込数
    dカード総数 / dカード目標数

- ドコモ光申込数
    ドコモ光総数 / ドコモ光総数

- 指定ISP付帯率
    ISP販売数 / ドコモ光販売数

- TVOP販売数 付帯率
    TVOP販売数 / ドコモ光販売数

- SKP販売数 顧客背セット率
    ？？

- SKP販売数 ICセット率
    ？？


ParsonalRate(Pr)：個人達成率 - 各項目/店舗目標
- PI販売数
    PI件数 / PI目標数

- HS/タブレット新規販売数
    HS件数 / HS目標数

- マイグレ販売数
    マイグレ件数 / マイグレ目標数

- スマホ/タブレット総販
    総販数 / 総販目標数

- dカード申込数
    dカード総数 / dカード目標数

- ドコモ光申込数
    ドコモ光総数 / ドコモ光総数

- 指定ISP付帯率
    ISP販売数 / ドコモ光販売数

- TVOP販売数 付帯率
    TVOP販売数 / ドコモ光販売数

- SKP販売数 顧客背セット率
    ？？

- SKP販売数 ICセット率
    ？？


■機能
USER
・日報報告
　PI販売数・HS・総販・dカード・ドコモ光・ISP販売数・TVOP販売数


・自分のスコア確認
　└目標までの数値

ADMIN
・ログイン
・ユーザー選択
・ユーザー選択
