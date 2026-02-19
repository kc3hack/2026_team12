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
  const [text, setText] = useState("パソコン");

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 text-white">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="text-gray-400 bg-gray-100 rounded-md text-center"
      />
      <p>{text}</p>
      <button
        onClick={() =>
          onConfirm({
            type: "Any",
            name: text,
          })
        }
        className="mt-4 rounded-xl bg-cyan-300 px-6 py-3 text-lg font-semibold text-purple-900 shadow-lg transition hover:bg-yellow-300 active:scale-95"
      >
        次へ
      </button>
      {/* 仮で表示 */}
      <div>{children}</div>
    </div>
  );
};

export default InputScene;
