import type { Merchandise } from "../Screen/Input/input_screen";
import type { Drawable } from "./abstract";
import type { Question, EffectFn } from "./types"; // 先ほどの型

/**
 * すべての画面のベース
 */
export interface Screen extends Drawable {
  type: "start" | "input" | "question" | "result";
}

/**
 * 1. Start画面
 */
export interface StartScreen extends Screen {
  type: "start";
  onStart: () => void; // 開始ボタンを押した時のイベント
}

/**
 * 2. 欲しいもの入力画面
 */
export interface InputScreen extends Screen {
  type: "input";
  onConfirm: (item: Merchandise) => void; // アイテム確定時
}

/**
 * 3. 質問画面
 */
export interface QuestionScreen extends Screen {
  type: "question";
  question: Question; // 現在表示中の質問
  currentIndex: number; // 第何問目か
  totalQuestions: number; // 全何問か
  onAnswer: (effect: EffectFn) => void; // 回答が選ばれた時
}

/**
 * 4. 結果表示画面
 */
export interface ResultScreen extends Screen {
  type: "result";
  finalScore: number; // 最終的な「買うべき度」 (0.0 - 1.0)
  itemName: string; // 最初に入力したアイテム名
  onRetry: () => void; // 最初に戻る
}

/**
 * 全画面をまとめたUnion型（Union Distributionを活用するため）
 */
export type AppScreen =
  | StartScreen
  | InputScreen
  | QuestionScreen
  | ResultScreen;
