# Node.js - fs

## fs.readFileSync(path, encode)

ファイルを読み込む

返り値は Buffer

## fs.readFile(path, encode, function(error, data) { ... })

ファイルを読み込む

コールバックの引数 data は string

## fs.writeFile(path, data, function(error) { ... })

ファイルを保存する

## fs.statSync(path)

ファイルの情報を取得する

path を間違えるとエラーを吐いて終了する

## fs.readdirSync(path)

path 内のファイル・ディレクトリ一覧を取得する
