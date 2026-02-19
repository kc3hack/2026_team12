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
    <div style={{ textAlign: "center", margin: "0px auto" }}>
      やあ😄<br></br>私はアルコールランプの魔人だよ🥺❤️ <br></br>
      君の物欲を調べてあげよう🤪
    </div>,
  );
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleClick = () => {
    setShowButton(true);
    setMessage(<div>これで大丈夫かな？🌕</div>);
  };

  return (
    <div
      className="space-y-6 min-h-screen flex flex-col items-center justify-center text-black"
      style={{ backgroundColor: "#e0ffff" }}
    >
      <div
        className="flex w-96 h-40 text-black rounded-2xl text-3xl text-center items-center"
        style={{
          backgroundColor: "#fffacd",
          fontSize: "1.5rem",
          padding: "0.5rem 1rem",
          marginLeft: "5rem",
        }}
      >
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
            className="text-black bg-gray-100 rounded-md text-center h-10"
            style={{ width: "25rem", fontSize: "1rem", marginLeft: "5rem" }}
          />
          {/* <p>{text}</p> */}
          <div>
            <button
              onClick={handleClick}
              className="rounded-xl bg-cyan-300 font-semibold text-black shadow-lg transition hover:bg-yellow-300 active:scale-95"
              style={{
                fontSize: "1.125rem",
                padding: "0.75rem 2rem",
                marginTop: "1rem",
                marginLeft: "5rem",
              }}
            >
              決定
            </button>
          </div>
        </div>
      )}
      {showButton && (
        <div>
          <p
            className="text-black rounded-md text-center h-10"
            style={{
              width: "25rem",
              fontSize: "1.5rem",
              padding: "0.5rem 2rem",
              marginLeft: "5rem",
            }}
          >
            調べるもの：{text}
          </p>
          <button
            onClick={() =>
              onConfirm({
                type: "Any",
                name: text,
              })
            }
            className="rounded-xl bg-cyan-300 font-semibold text-black shadow-lg transition hover:bg-yellow-300 active:scale-95"
            style={{
              fontSize: "1.125rem",
              padding: "0.75rem 2rem",
              marginTop: "1rem",
              marginLeft: "5rem",
            }}
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
