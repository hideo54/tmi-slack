# tmi-slack

[東京大学大学院工学系研究科技術経営戦略学専攻 (TMI)](https://tmi.t.u-tokyo.ac.jp/) 2023年度入学生の Slack で動作する Slack bot のソースコードです。

TMI 生からの pull request は積極的に受け付けます!

## About

`functions/` 以下のソースをもとに、毎時実行される `tmiSlackHourlyJob` 関数と、Slack Events を受け取る `tmiSlackEventsReceiver` 関数が Cloud Functions 上で動作します。

### faculty-news

工学部ポータルサイトのお知らせの更新を取得し投稿します。

### channel-notifier

新しいチャンネルが作成されたり、チャンネルが unarchive されたりした時に投稿します。

## setup

* `cd functions; cp sample.env .env` + よしなに
* GitHub Actions による自動デプロイは……組んでないです……やりたいね
* Slack App の構成は Manifest 参照。
