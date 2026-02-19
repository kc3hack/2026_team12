import React, { useState, useRef, useEffect } from "react";
import type { ScreenController } from "./component";
import StartScreen from "../Screen/Start/Start";
import InputScene from "../Screen/Input/Input";
import QuestionScene from "../Screen/Question/Question";
import ResultScene from "../Screen/Result/Result";
import DefaultScreenController from "./ScreenController/ScreenController.tsx";

export interface IMainController {
  onScreenChange?: (screenType: string) => void;
}

const MainController: React.FC<IMainController> = ({ onScreenChange }) => {
  const [renderKey, setRenderKey] = useState(0);
  const screenControllerRef = useRef<ScreenController | null>(null);

  // ScreenControllerの実装
  const screenController: ScreenController = {
    start: (screen) => <StartScreen {...screen} />,
    input: (screen) => <InputScene {...screen} />,
    question: [(screen) => <QuestionScene {...screen} />],
    result: (screen) => <ResultScene {...screen} />,
    update: () => {
      // 画面変異時の処理
      setRenderKey((prev) => prev + 1);
      if (onScreenChange) {
        onScreenChange("screen changed");
      }
      console.log("Screen update triggered");
    },
  };

  // ScreenControllerの参照を保存
  useEffect(() => {
    screenControllerRef.current = screenController;
  }, []);

  // ScreenControllerを制御する関数群
  const controlScreenController = {
    /**
     * 強制的に画面を更新する
     */
    forceUpdate: () => {
      screenController.update();
    },

    /**
     * ScreenControllerのupdate関数を手動で呼び出す
     */
    triggerUpdate: () => {
      if (screenControllerRef.current) {
        screenControllerRef.current.update();
      }
    },

    /**
     * ScreenControllerの状態をリセット
     */
    reset: () => {
      setRenderKey(0);
      screenController.update();
    },

    /**
     * デバッグ情報を取得
     */
    getDebugInfo: () => {
      return {
        renderKey,
        hasController: !!screenControllerRef.current,
      };
    },
  };

  // 外部からアクセス可能にするため、windowオブジェクトに登録（デバッグ用）
  useEffect(() => {
    (window as any).screenControllerDebug = controlScreenController;
  }, [renderKey]);

  return (
    <div>
      <DefaultScreenController {...screenController} />

      {/* デバッグパネル（開発環境のみ） */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          <p>Render Key: {renderKey}</p>
          <button
            onClick={controlScreenController.forceUpdate}
            className="bg-blue-500 px-2 py-1 rounded mt-2 text-xs"
          >
            Force Update
          </button>
        </div>
      )}
    </div>
  );
};

export default MainController;

// ScreenControllerを外部から制御するためのヘルパー関数をエクスポート
export const useScreenController = () => {
  return (window as any).screenControllerDebug || null;
};
