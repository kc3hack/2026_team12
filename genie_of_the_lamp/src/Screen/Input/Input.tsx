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
    <div>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() =>
          onConfirm({
            type: "Any",
            name: text,
          })
        }
      >
        次へ
      </button>
      {/* 仮で表示 */}
      <p>{text}</p>
      <div>{children}</div>
    </div>
  );
};

export default InputScene;
