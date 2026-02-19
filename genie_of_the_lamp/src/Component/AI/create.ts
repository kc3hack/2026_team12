import type { Question } from "../types";
import BACKEND_ROOT from "./gemaiQuestion";

interface AIQuestionResponse {
  question: string;
  answer: number[];
}

const createEffectFromWeight = (weight: number) => {
  return (score: number): number => {
    const adjusted = score + (weight - 1.0);
    return Math.max(0, Math.min(1, adjusted));
  };
};

const CreateAIQuestion = async (): Promise<Question[]> => {
  try {
    const backendUrl = await BACKEND_ROOT;
    console.log("Fetching from:", backendUrl);

    const res = await fetch(backendUrl);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const message = data.message;
    const questionData: AIQuestionResponse[] = JSON.parse(message);

    return questionData.map((q, index) => ({
      id: `ai-q${index + 1}`,
      text: q.question,
      options: q.answer.map((weight, optionIndex) => ({
        label: `選択肢${optionIndex + 1}`,
        effect: createEffectFromWeight(weight) as any,
      })),
      filter: {
        type: new Set(["all"]),
      },
    }));
  } catch (error) {
    console.error("CreateAIQuestion Error:", error);
    return [];
  }
};

export default CreateAIQuestion;
