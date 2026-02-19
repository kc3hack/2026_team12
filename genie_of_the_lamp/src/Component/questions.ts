import type { Purchasability, Question } from "./types";
import questionData from "./question.json";

const DEFAULT_CONSTANT = 0.0;
const DEFAULT_WEIGHT = 1.0;

type AnswerDefinition = {
  key: string;
  labels: {
    label: string;
    effect: {
      weight?: number;
      constant?: number;
    };
  }[];
};

const DEFAULT_ANSWER: AnswerDefinition = {
  key: "normal",
  labels: [
    { label: "はい", effect: { weight: 1.2 } },
    { label: "いいえ", effect: { weight: 0.8 } },
    { label: "わからない", effect: { weight: 1.0 } },
    { label: "多分そう 部分的にそう", effect: { weight: 1.1 } },
    { label: "多分違う そうでもない", effect: { weight: 0.9 } },
  ],
};

const clampScore = (score: number): number => {
  if (score >= 1.0) {
    return 1.0;
  }
  if (score <= 0.0) {
    return 0.0;
  }
  return score;
};

// "Purchase Propensity (PP)"
// (購買傾向値）
// の計算
const createEffect =
  (weight?: number, constant?: number) =>
  (score: number): number => {
    const appliedWeight = weight ?? DEFAULT_WEIGHT;
    const appliedConstant = constant ?? DEFAULT_CONSTANT;
    return clampScore(score * appliedWeight + appliedConstant);
  };

const createOptions = (answer: AnswerDefinition): Purchasability[] => {
  return answer.labels.map((option) => ({
    label: option.label,
    effect: createEffect(option.effect.weight, option.effect.constant),
  }));
};

const createAnswerMap = (): Map<string, AnswerDefinition> => {
  return new Map(
    questionData.answer.map((answer) => {
      const parsedAnswer = answer as AnswerDefinition;
      return [parsedAnswer.key, parsedAnswer] as const;
    }),
  );
};

export const AllQuestions: Question[] = (function () {
  const answerMap = createAnswerMap();

  return questionData.questions.map((question) => {
    const answerDefinition = answerMap.get(question.options) ?? DEFAULT_ANSWER;
    return {
      id: question.id,
      text: question.text,
      options: createOptions(answerDefinition),
    };
  });
})();

export const FilterQuestion = () => {};
