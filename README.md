# 概要
いいねやLGTMやスキもいいけれど、リアクションは多ければ多いほど楽しいですよね。

そこで、SlackやDiscordのように、複数の絵文字を使って反応が出来る記事投稿プラットフォームを作ろうと思いました。

リアクションに絵文字を選んだ理由は次の通りです。
- かわいい
- たくさんある
- 環境に左右されにくい

また、ユーザーの情報を見たときに、その人がどんな記事を書いているのか？というのを、記事に付与されている文字のタグなどではなく、他人から貰ってるリアクションの総数で視覚的に示せたら楽しそうだと思いました。

つまり、コンセプトとしては、
- ある投稿に対して、複数の絵文字でリアクションが出来る
- ユーザーの性質を、貰っているリアクションで表す

というものを目指しました。

# 使用言語、フレームワークなど
- フロントエンド: React (with TypeScript)
- バックエンド
	- API: GraphQL
	- 認証: AWSCognito
	- データベース: AWS DynamoDB

ホスティング、及びバックエンドリソースの作成にはAWS Amplifyを使用しました。

これらを選んだ理由としては
- 最近Reactが良いと聞く
- 最近GraphQLが（略
- 個人的なブログサイトをホストするのにAWS Amplifyを使っているため、慣れ親しんでいて手軽に使える。非常に強力で他に選択肢が思い浮かばない。
- componentとデザインをするにあたって型があった方がいい→TypeScript

ReactとGraphQLについては「使ったことないがないのでやってみたい」という気持ちが一番大きいです。

TypeScriptは以前Angularを使った時に少しだけ触ったことがあったので、また使ってみたいという気持ちも少しありました。

## ビルド、デプロイ、動作確認した環境

### 使用環境
- OS: Ubuntu 18.04.5 on Windows 10 WSL 1
- Node: v14.16.0
- npm: 6.14.11
- AWS Amplify CLI: 4.46.1

### アプリケーション
```sh
npm run build
npm start
```

### バックエンドリソース

AWS Amplify CLIを利用した各種バックエンドリソースのビルド及びデプロイにはIAMユーザーの共有などの手続きが必要になってしまうため、申し訳ないのですが省略させていただきます。

実は複数の環境でAWSを使う際の勝手がよく分かってないので、もしこうすると良いというのがあれば教えていただけると幸いです・・・

# 自己評価、感想

絵文字による多様なリアクションと、ユーザーのタイプをリアクション総数で視覚的に表すという当初目標としていたコンセプトは一応実現できたと思う。

AmplifyとReactとTypeScriptとJavaScriptをほぼ同時に勉強しながらの開発だったことを踏まえれば、個人的には満足もしている。

## 問題点

しかし、現実的には問題が山積みであることは否めない。

全てを列挙しきることは出来ないが、以下に主な問題点を記す。

### 機能が限定的で少ない
サポートされていない機能をあげればキリがない。

- 最新20件より古い記事の閲覧
- 記事の編集・削除
- 記事本文内での改行、画像の使用
- markdownによる記事の作成
- 記事エディタ
- 記事単体のページ、記事のシェア
- 絵文字による記事のフィルタリング
- アカウント情報の編集、削除
- Twitterアカウントによる認証
- リアクションの削除
- リアクションは1人1回まで
- ユーザーのフォロー

特に絵文字による記事の検索は、コンセプトに非常に密接に関連しているため実装できなかったのが悔やまれる。これらの機能は今後追加していこうと思う。

### コンポーネントデザインになっていない
Reactの魅力の一つにデザインのコンポーネント化があるが、最初こそComponentを分けていたものの、子コンポーネントでフックを使おうとした際にうまくいかず、時間がなかったのもありMainコンポーネントがどんどん肥大化してしまった。

トップページとユーザープロフィールを表示する処理が混ざっていてコードも読みにくい。

### フックが何度も呼ばれる
1回呼び出せばいいAPIを、副作用で5回も10回も呼び出しているところがある。動作も重くなるし費用もかさむし非常にまずい。原因の解明が急がれる。

### TypeScriptなのにTypeがない
個人的には一番なんとかしたいと思っている問題点。GraphQLはクライアント側で返すデータ型を決めることが出来るというのが特徴で、これは非常にTypeScriptと相性が良さそうだと感じたのだが、実装を急ぐあまりはちゃめちゃにanyを使ってしまった。酷い。

### 似たような動作の実現に複数の手法を用いている
勉強と開発が同時に行われることの弊害として、やっていくうちにコロコロ手法が変わるというものがある。「ここではこのinterfaceを使っているのこっちではなぜ？」みたいなものが多い。queryの送り方、返ってきたデータの処理の仕方も統一されていない。


# 参考文献、URL
https://aws.amazon.com/jp/getting-started/hands-on/build-web-app-s3-lambda-api-gateway-dynamodb/?sc_icampaign=acq_jp_getting-started-handson-202010-build-web-app-s3-lambda-api-gateway-dynamodb&sc_language=jp&sc_icontent=awssm-6336&sc_iplace=ribbon&trk=ha_ribbon_acq_jp_getting-started-handson-202010-build-web-app-s3-lambda-api-gateway-dynamodb

https://aws.amazon.com/jp/getting-started/hands-on/build-react-app-amplify-graphql/

https://zenn.dev/naoki_mochizuki/articles/46928ccb420ee733f78f

https://developer.mozilla.org/ja/docs/Web/JavaScript/A_re-introduction_to_JavaScript

など
