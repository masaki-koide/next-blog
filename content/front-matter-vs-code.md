---
title: VS Codeでブログを書く
slug: front-matter-vs-code
date: 2022-05-05T07:10:21.837Z
lastmod: 2022-07-26T11:31:10.636Z
draft: false
tags:
  - VSCode
categories: []
---
VS Codeでブログを書くことにしたというお話

ブログを作るにあたって、最近はデータベースとしてHeadless CMSを使うケースが多いですよね。僕もそうしようとしていたんですが、だんだんそれって本当に必要か？という気分になってきました。Headless CMSは確かにリッチで便利なんですけど、記事を書いていてどうもしっくりこなくて、やっぱり普段から使っていて馴染みのあるエディターで書きたいんだよなぁと思ってしまいました。言うてもただのブログなんで、リッチな管理機能があることよりも、書いててテンションが上がることの方が大事だったわけです。そんなわけで色々調べていて見つけたのが、Front MatterというVS Codeの拡張機能です。

## Front Matterとは

[The CMS running in VS Code for your static sites | Front Matter](https://frontmatter.codes/)

>The CMS running in VS Code

とあるように、VS CodeにCMSの機能を組み込むことができるので、もうこれでいいんじゃね？ってなりました。記事や画像の一覧、検索やソートといった基本的な機能を備えているし、とくに記事を書くときの体験が好きです。

![front-matter-vs-code {1640x1061}](/img/front-matter-vs-code.webp)

コンテンツのmarkdownファイルはローカルに置きます。僕は静的サイトのフレームワークとしてNext.jsを使っていて、コンテンツを格納しているディレクトリーからmarkdownファイルを取得・パースして、静的なページを作るように実装しています。記事を書く流れとしては、ローカルサーバーを起動させながら、markdownファイルとプレビューを横に並べて、実際に表示される感じを確認しながら記事を書くことができます。この体験がめちゃくちゃいいんですよ。コンテンツの実体はローカルにあるので、書くだけならネットワークに接続する必要もないです。もちろん、VS Codeなので、校正ツールやLinterなども入れていれば機能します。サイドの編集パネルがおしゃれで、GUIのフォームを埋めるとmarkdownファイルの上部のメタ情報（これをFront Matterと言うらしく、拡張機能の名前の由来でしょうか）が更新される仕組みになっていたり、SEOのステータスやコンテンツの構造（全体で見出しや段落がいくつあるかとか）なども確認できます。

## Front Matterの初期設定

Front Matterの初期設定としては、基本的に拡張機能のインストール後に表示される手順通り行えばOKで、とくに複雑なものはありませんでした。静的サイトのフレームワークとしては、Next.js以外にもGatsbyやHugoなど結構いろいろ対応されているみたいです。初期設定が完了すると、コンテンツのテンプレートやconfigファイルが自動で作成されていました。

コンテンツのテンプレートファイルの`article.md`。

```
---
title:
slug:
date: 2019-08-22T15:20:28.000Z
lastmod: 2019-08-22T15:20:28.000Z
draft: true
tags: []
categories: []
---

```

設定ファイルの`frontmatter.json`。フレームワークの種類や、publicフォルダー、markdownファイルを格納するcontentフォルダーのパスが設定されています。この情報をもとにダッシュボードを構築しているんですかね。

```json
{
  "$schema": "https://frontmatter.codes/frontmatter.schema.json",
  "frontMatter.framework.id": "next",
  "frontMatter.content.publicFolder": "public",
  "frontMatter.content.pageFolders": [
    {
      "title": "content",
      "path": "[[workspace]]/content"
    }
  ]
}
```

## 感想

やはりVS Codeは最高なので、VS Codeで記事が書けるのは最高ということです。欠点としては、記事はgitで管理して、ビルドはgit pushを起点とするので、外出先でスマホからブログを更新するみたいなのは難しいぐらいですかね。僕はあんまりそういうケースがないので問題になっていませんが。
