import React, { useState, type JSX } from "react";
import type { ScreenController } from "../component";
import type { Question, EffectFn } from "../../Component/types";
import type { Merchandise } from "../../Screen/Input/Input";
import { mockQuestions } from "../../Component/mock";
import Header from "../../Header/Header";

export interface IDefaultScreenController extends ScreenController {}

const DefaultScreenController: React.FC<IDefaultScreenController> = ({
  start,
  input,
  question,
  result,
  update,
}) => {
  // 現在の画面状態
  const [currentScreen, setCurrentScreen] = useState<
    "start" | "input" | "question" | "result"
  >("start");

  // ダミーの質問データ（実際のデータに置き換え予定）
  const [questions] = useState<Question[]>(mockQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0.5); // 初期スコア 50%
  const [itemName, setItemName] = useState("");

  // 各画面のコールバック実装
  const handleStart = () => {
    setCurrentScreen("input");
    update();
  };

  const handleConfirm = (item: Merchandise) => {
    setItemName(item.name);
    setCurrentScreen("question");
    setCurrentQuestionIndex(0);
    update();
  };

  const handleAnswer = (effect: EffectFn) => {
    const newScore = effect(currentScore);
    setCurrentScore(newScore);

    if (currentQuestionIndex + 1 >= questions.length) {
      // 最後の質問が終わったので結果画面へ
      setCurrentScreen("result");
    } else {
      // 次の質問へ
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    update();
  };

  const handleRetry = () => {
    setCurrentScreen("start");
    setCurrentQuestionIndex(0);
    setCurrentScore(0.5);
    setItemName("");
    update();
  };

  const handleBackStart = () => {
    setCurrentScreen("start");
    setCurrentQuestionIndex(0);
    setCurrentScore(0.5);
    setItemName("");
    update();
  };

  const handleBackQuestion = () => {
    if (currentScreen === "question") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else {
        setCurrentScreen("input");
      }
      update();
      return;
    }

    if (currentScreen === "result") {
      setCurrentScreen("question");
      setCurrentQuestionIndex(Math.max(questions.length - 1, 0));
      update();
    }
  };

  let rt: JSX.Element;
  // 現在の画面に応じてJSXを返す
  switch (currentScreen) {
    case "start":
      rt = start({
        type: "start",
        onStart: handleStart,
      });
      break;

    case "input":
      rt = input({
        type: "input",
        onConfirm: handleConfirm,
      });
      break;

    case "question":
      rt = question[0]({
        type: "question",
        question: questions[currentQuestionIndex],
        currentIndex: currentQuestionIndex + 1,
        totalQuestions: questions.length,
        onAnswer: handleAnswer,
      });
      break;

    case "result":
      rt = result({
        type: "result",
        finalScore: currentScore,
        itemName: itemName,
        onRetry: handleRetry,
      });
      break;

    default:
      rt = start({
        type: "start",
        onStart: handleStart,
      });
  }

  return (
    <div className="app-container flex min-h-screen">
      <aside className="w-56 shrink-0 p-4">
        <Header backStart={handleBackStart} backQuestion={handleBackQuestion} />
      </aside>
      <main className="flex-1">{rt}</main>
    </div>
  );
};

export default DefaultScreenController;
