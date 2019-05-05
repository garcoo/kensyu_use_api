# kensyu_use_api

お天気Webサービス(Livedoor Weather Web Service)APIから取得した天気情報をチャットワークに通知するAPI  
外部サービスAPIの活用体験研修用  
ついでにnode.jsを使ってみる(コードが汚いのはご勘弁を)
<br><br>
# 準備
## 環境
### node.jsのインストール
node.jsの準備からの人は、[ここらへん](https://qiita.com/Masayuki-M/items/840a997a824e18f576d8)を参照  
IDEはお好みで

### gitのインストール
gitの準備からの人は、[ここらへん](https://git-scm.com/book/ja/v2/%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%82%8B-Git%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

## ソースの取得→開発ブランチ準備
### clone
```
# cloneするディレクトリへcdしておく
git clone https://github.com/garcoo/kensyu_use_api.git
```
### 開発用のブランチを作成
```
git checkout -b {YOUR_BRANCH}
```

※以降のgit操作は[こちらを参照](https://backlog.com/ja/git-tutorial/)

### 開発用ymlファイルを作成
application.ymlファイルをコピーして、  
同じ階層にapplication-develop.ymlファイルを作成する
>kensyu_use_api  
>　|---- /config  
>　|　　　└ application.yml  
>　|　　　└ application-develop.yml   ★新規作成

### 開発用ymlファイルの編集
chatworkのAPIキーを発行して、発行されたAPIキーをchatwork api keyに記載する  
併せて投稿したいルームIDもchatwork room idに記載  
(今回DBは使わないのでdatasourceは編集不要)
```
api:
  chatwork:
    base_url: https://api.chatwork.com/v2
    room_id: # chatwork room id
    api_key: # chatwork api key
  livedoor:
    base_url: http://weather.livedoor.com/forecast/webservice/json/v1
    city: 140010 # see -> http://weather.livedoor.com/forecast/rss/primary_area.xml
datasource:　# db使いたい時だけ設定
  host: 'XXX.XXX.XXX.XXX'
  db: dbname
  user: user name
  password: pw
```
<br><br>
# 開発
## ディレクトリ構成について
>kensyu_use_api  
>　|---- /config  
>　|---- /node_modules   
>　|---- app.js  
>　|---- package-lock.json  

*/config*  環境依存の設定値を持つyamlファイル格納場所  
*/node_modules* インストールしたライブラリの格納場所  
*app.js* 起動するアプリケーション(今回はここに処理を実装)  
*package-lock.json* インストールしたパッケージの詳細とか書いてある  

## 実装
app.jsに思う存分

## 実行
```
cd kensyu_use_api
node app.js
```
