# git pull 実行時の「divergent branches」エラー対処法

`git pull` を実行した際、リモートとローカルのブランチが分岐（divergent）しており、その統合方法がGitの設定で指定されていない場合に発生するエラーとその解決策です。

## 発生するエラー（事象）

`git pull` 実行時に以下の警告およびエラーメッセージが表示され、Pullが中断されます。

```sh
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
```

## 原因

Git 2.27 以降、`git pull` 時のデフォルトの挙動（マージ、リベース、Fast-forward）をユーザーが明示的に設定することが推奨されるようになったためです。

## 対処法（解決策）

以下のいずれかのコマンドを実行し、ブランチの統合戦略を設定してください。設定後は再度 `git pull` を実行すると正常に処理されます。

### 1. 今まで通りの挙動（マージ）にする場合
最も一般的な選択肢です。従来の Git の挙動と同じく、Pull時に自動的にマージコミットが作成されます。

```sh
git config pull.rebase false
```

### 2. リベースで統合する場合
コミット履歴を一直線に保ちたい場合に使用します。

```sh
git config pull.rebase true
```

### 3. Fast-forward のみ許可する場合
ローカルに独自のコミットがある場合にPullを失敗させ、意図しないマージコミットを防ぎたい場合に使用します。

```sh
git config pull.ff only
```

---

## 💡 Tips: 全てのリポジトリにデフォルト適用する場合

上記コマンドは現在のリポジトリのみに適用されます。PC内のすべてのGitリポジトリに対して同じ設定をデフォルトにしたい場合は、コマンドに `--global` オプションを付与してください。

**例（グローバル設定でマージを指定）:**

```sh
git config --global pull.rebase false
```
