import { type QuestionScreen } from "../../Component/screen";

export interface IQuestionScreen extends QuestionScreen {}

/**
 * ## Sample Code
 * ```tsx
 * <QuestionScene type={"question"} question={{
 *        id: mockQuestions[0].id,
 *        text: mockQuestions[0].text,
 *        options: mockQuestions[0].options,
 *      }} currentIndex={0} totalQuestions={0} onAnswer={()=>{}} ></QuestionScene>
 *  ```
 * @param param0
 * @returns
 */
const QuestionScene = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: IQuestionScreen) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-black"
      style={{ backgroundColor: "#e0ffff" }}
    >
      {/* 進捗表示 */}
      <div className="mb-8 text-center">
        <p className="text-black text-lg font-semibold">
          第 {currentIndex} 問目 / 全 {totalQuestions} 問
        </p>
      </div>

      {/* 質問表示 */}
      <div
        className="border-2 border-yellow-400 rounded-lg p-8 mb-8 max-w-2xl"
        style={{ backgroundColor: "#fffacd" }}
      >
        <h2 className="text-black text-2xl font-bold text-center leading-relaxed">
          {question.text}
        </h2>
      </div>

      {/* 選択肢表示 */}
      <div className="space-y-4 w-full max-w-xl">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.effect)}
            className="w-full bg-yellow-300 hover:bg-yellow-200 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-yellow-300"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScene;
