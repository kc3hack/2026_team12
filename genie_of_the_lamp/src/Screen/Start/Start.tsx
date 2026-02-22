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
  const explanation = "";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-black"
      style={{ backgroundColor: "#e0ffff" }}
    >
      {/* アプリ名 */}
      <h1 className="text-4xl font-bold text-black flex justify-center">
        {appName}
      </h1>

      {/* 説明文 */}
      <p className="max-w-md text-lg leading-relaxed text-black">
        {explanation}
      </p>

      {/* 開始ボタン */}
      <button
        onClick={onStart}
        className="mt-4 rounded-xl bg-yellow-300 px-6 py-3 text-lg font-semibold text-black shadow-lg transition hover:bg-yellow-200 active:scale-95"
      >
        判定を開始する
      </button>
      {children}
    </div>
  );
};

export default StartScene;
