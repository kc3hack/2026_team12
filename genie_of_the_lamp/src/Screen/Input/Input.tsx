import type { InputScreen } from "../../Component/screen";
import { useState } from "react";

export type MerchandiseType = "Any" | "Other";
export interface Merchandise {
  name: string;
  type: MerchandiseType;
}

export interface IInputScreen extends InputScreen {
  type: "input";
}
const InputScene = ({ onConfirm, children = <></> }: IInputScreen) => {
  const [message, setMessage] = useState(
    "やあ！私はランプのお兄さんだよ！ 君の物欲を調べてあげよう！",
  );
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleClick = () => {
    setShowButton(true);
    setMessage("これで大丈夫かな？");
  };

  return (
    <div className="space-y-6 min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="flex w-150 h-64 bg-gray-200 text-black px-4 py-2 rounded-2xl ml-80 text-4xl text-center items-center">
        {message}
      </div>
      {!showButton && (
        <div>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="ここに調べたいものを入力"
            className="text-black bg-gray-100 rounded-md text-center w-100 h-10 ml-80"
          />
          {/* <p>{text}</p> */}
          <div>
            <button
              onClick={handleClick}
              className="mt-4 rounded-xl bg-cyan-300 px-8 py-3 text-lg font-semibold text-purple-900 shadow-lg transition hover:bg-yellow-300 active:scale-95 ml-200"
            >
              決定
            </button>
          </div>
        </div>
      )}
      {showButton && (
        <div>
          <p className="text-white rounded-md text-center w-100 h-10 ml-80 px-8 py-2 text-2xl">
            調べるもの：{text}
          </p>
          <button
            onClick={() =>
              onConfirm({
                type: "Any",
                name: text,
              })
            }
            className="mt-4 rounded-xl bg-cyan-300 px-8 py-3 text-lg font-semibold text-purple-900 shadow-lg transition hover:bg-yellow-300 active:scale-95 ml-200"
          >
            次へ
          </button>
        </div>
      )}
      {/* 仮で表示 */}
      <div>{children}</div>
    </div>
  );
};

export default InputScene;
