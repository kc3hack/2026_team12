// import type { Drawable } from "../../Component/abstract";
import type { StartScreen } from "../../Component/screen.ts";

interface IStartScene extends StartScreen {
  explanation?: string;
  appname?: string;
}
/**
 * 開始画面
 * @param Props
 * @returns jsx.Element
 */
const StartScene = ({ onStart, children }: IStartScene) => {
  // タイトルと説明はコンポーネント内で変数として定義
  const appName = "衝動買いアキネーター";
  const explanation = "説明文章";

  return (
    <div className="">
      {/* アプリ名 */}
      <h1 className="text-4xl font-bold text-white">{appName}</h1>

      {/* 説明文 */}
      <p className="max-w-md text-lg leading-relaxed text-slate-200">
        {explanation}
      </p>

      {/* 開始ボタン */}
      <button
        onClick={onStart}
        className="mt-4 rounded-xl bg-cyan-300 px-6 py-3 text-lg font-semibold text-purple-900 shadow-lg transition hover:bg-yellow-300 active:scale-95"
      >
        判定を開始する
      </button>
      {children}
    </div>
  );
};

export default StartScene;
