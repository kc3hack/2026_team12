# 概要

このフォルダを`chrome://extensions/`の

`パッケージ化されていない拡張機能を追加`

で選択して下さい。

Amazonのサイトで使えます。

# 開発者向け

srcフォルダの中身をVSCodeで開くと、エラーがいっぱいでますが一旦無視してもらって

```sh
cd src
sh tsc.sh
```

で自動的にコンパイル&フォルダの移動をしてくれます。

今の所読ませる気のないコードなので誰か直してください。

## コードの解説

なんかJavaScriptでは実質シングルトンクラスを簡単に作れるようです（ゴリ押し）。

```js
const singleton = new (class {
    constructor(){

    }
})();
```

しかも継承もできるようです。

⇩ 究極のクソコード(hello world)

```js
/**
 * JavaScript入門！！
 */
const instance = new (class {
  constructor(){
    (function(){
      console.log("はろー");
    })();
  }
})();
```
