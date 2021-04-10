# 10日間で作るマルチリアクション型短文投稿プラットフォーム

## 概要
いいねやLGTMやサムズアップもいいけれど、リアクションは多ければ多いほど楽しいですよね。

SlackやDiscordで出来るような複数の絵文字を使って反応が出来るSNSみたいなものが作りたかったです。

ユーザーの情報を見たときに、その人がどんな記事を書いているのか？というのを、記事に付与されている文字のタグなどではなく、他人から貰ってるリアクションの総数で視覚的に示せたら楽しそう。つまりコンセプトとしては、

- ある投稿に対して、複数の絵文字でリアクションが出来る
- ユーザーの性質を、貰っているリアクションで表す

というものを目指しました。

## 使用フレームワークなど
- フロントエンド: React(with typescript)
- バックエンド: GraphQL, AWS Cognito, AWS DynamoDB
- ホスト: AWS Amplify

選んだとしては
- 個人的なブログサイトをホストするのにAWS Amplifyを使っていて、SPAをホストするのに最も適していると感じる
- 最近Reactが良いと聞く
- 最近GraphQLが（略
- componentとデザインをするにあたって型があった方がいい(TypeScript)

特に理由はないものの方が多いですね。やったことないのでやってみたいというのが一番かな。ちなみに、
- React, GraphQL ... 全く触ったことがない
- JavaScript, TypeScript ... 使用経験3か月未満くらい。正直全部忘れてた。

心の中のミサトさん「サーバレスサーバレスゥ～↑」

## 1日目
こんな記事を書いていました。
https://miruohotspring.net/blog/github-actions-lambda/

この時はまだ「Lambda書いてAPI Gatewayと接続したりDynamoDB触ったりするんだろうな～～」とか思っていました。
ちなみに直にlambdaを触ることはないです（）

## 2日目

これをやりました。

[AWS で React アプリケーションを構築する](https://aws.amazon.com/jp/getting-started/hands-on/build-react-app-amplify-graphql/)

以下当時の日記（原文ママ）

あと `amplify add` が何をしているのかというのが分かりにくい。コンソールを確認するとdynamoDBにテーブルが追加されていたりAppSyncにAPIが追加されていたりする。AppSyncって何？？？

要するにamplifyは便利だが、各サービス間のやり取りが過度にブラックボックス化してしまって外から何をやっているのか分かりにくいという難点がある（そういうものだが）

LambdaとAPI Gatewayを使っていた時が一番楽しかったなぁ。もうそういう時代は終わってしまったのか？

というかJavaScriptもtypescriptも普通に全然分からなくて泣いている。

以上、今日はここまでにしたいけどもう少し調べものして寝ます。

## 3日目


