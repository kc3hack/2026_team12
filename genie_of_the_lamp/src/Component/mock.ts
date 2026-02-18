import type { Purchasability, Question } from "./types";
import questionData from "./question.json";

type _Option = {
  id: string;
  text: string;
  options: {
    label: string;
    effect: number;
  }[];
};
export const mockQuestions: Question[] = (function () {
  const create_opt = function (value: _Option) {
    const a: Purchasability[] = [];
    value.options.forEach((op) => {
      a.push({
        label: op.label,
        effect: (score) => {
          return score * op.effect;
        },
      });
    });
    return a;
  };
  const result: Question[] = [];
  questionData.forEach((value) => {
    result.push({
      id: value.id,
      text: value.text,
      options: create_opt(value),
    });
  });
  return result;
})();
