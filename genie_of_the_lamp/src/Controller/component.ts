import type { JSX } from "react";
import type {
  InputScreen,
  QuestionScreen,
  ResultScreen,
  StartScreen,
} from "../Component/screen";

export interface ScreenController {
  start: (screen: StartScreen) => JSX.Element;
  input: (screen: InputScreen) => JSX.Element;
  question: ((screen: QuestionScreen) => JSX.Element)[];
  result: (screen: ResultScreen) => JSX.Element;
  update: () => void;
}
