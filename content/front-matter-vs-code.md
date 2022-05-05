---
title: VSCodeでブログを書く
slug: front-matter-vs-code
date: 2022-05-05T07:10:21.837Z
lastmod: 2022-05-05T08:42:31.362Z
draft: true
tags: []
categories: []
---
VSCodeでブログを書くことにしたというお話

ソフトウェアエンジニアがやりがちな車輪の再発明「ブログを作る」ですが、最初は記事の管理にHeadless CMSを使おうとしていました。だけど、だんだんそれって本当に必要か？という気分になってきたのです。結局僕がやりたいのは「markdownを快適に書きたい」ってだけで、豪華なダッシュボードを使いたいわけじゃなかったのです。

Headless CMSで一番しっくりこなかったのは、書き味です。やっぱりあの独自の投稿フォームだと、書いてていまいちテンションが上がらなくて、やっぱり普段から使ってるVSCodeでブログを書きたいんだよなーと思っていたら、ようやくいいのを見つけました。Front MatterというVSCodeの拡張機能です。

## Front Matter

[The CMS running in VS Code for your static sites | Front Matter](https://frontmatter.codes/)

>The CMS running in VS Code

とあるように、VSCodeで記事の管理を行うことができます。記事や画像の一覧、検索やソートといった基本的なダッシュボード機能を備えているし、何より記事を書く画面が好きです。

![front-matter-vs-code](/img/front-matter-vs-code.png)

ローカルサーバーを起動させながら、markdownファイルとプレビューを並べて、プレビューを確認しながら記事を書くことができます。もちろん実体はローカルにあるので、書くだけならネットワークに接続する必要もありません。サイドの編集パネルがおしゃれで、GUIのフォームを埋めるとmarkdownファイルの上部のメタ情報（これをFront Matterと言うらしく、拡張機能の名前の由来だろうか）が更新される仕組みになっていたり、SEOのステータスや記事の構造（段落がいくつあるかとか）なども確認することができます。

## 初期設定

拡張機能の初期設定としては、インストール後に表示される手順通りに行えば大丈夫で、テンプレートファイルや拡張機能の設定ファイルが自動で作成され、特別なことは必要ありませんでした。

テンプレートファイルの`article.md`

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

設定ファイルの`frontmatter.json`。フレームワークの種類や、publicフォルダ、contentフォルダのパスが設定されています。この情報をもとにダッシュボードを構築しているのでしょう。

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

なお、フレームワークはNext.js以外にもGatsbyやHugoなど結構いろいろ対応されているそうです。

[Static Site Generator and Frameworks](https://frontmatter.codes/docs/ssg-and-frameworks#support-additional-file-types)

## 感想

今のところの感想だと、個人ブログ程度だったらこれでいいんじゃないかとなってます。普段から使っていて馴染みのあるエディタで書くのは快適ですし、VSCodeなのでLinterなどお好きな拡張機能を使うことさえできるのは強みです。
