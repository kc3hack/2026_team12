import { type ResultScreen } from "../../Component/screen";
import judgementData from "./judgement.json";

export interface IResultScreen extends ResultScreen {}

type JudgementInfo = {
  minScore: number;
  message: string;
  description: string;
  color: string;
  bgColor: string;
  emoji: string;
};

const ResultScene = ({ finalScore, itemName, onRetry }: IResultScreen) => {
  // スコアに応じたメッセージとカラーを決定
  const getResultInfo = (score: number): JudgementInfo => {
    for (const info of judgementData as JudgementInfo[]) {
      if (score >= info.minScore) {
        return info;
      }
    }
    // フォールバック（通常は到達しない）
    return judgementData[judgementData.length - 1] as JudgementInfo;
  };

  const resultInfo = getResultInfo(finalScore);
  const scorePercentage = Math.round(finalScore * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex flex-col items-center justify-center p-6">
      {/* タイトル */}
      <div className="mb-8 text-center">
        <h1 className="text-yellow-300 text-3xl font-bold mb-2">
          魔神の診断結果
        </h1>
        <p className="text-yellow-100 text-lg">「{itemName}」についての運命</p>
      </div>

      {/* 結果カード */}
      <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-8 mb-8 max-w-2xl text-center">
        {/* スコア表示 */}
        <div className="mb-6">
          <div className={`text-6xl font-bold ${resultInfo.color} mb-2`}>
            {scorePercentage}%
          </div>
          <div className="text-gray-300 text-sm">購買推奨度</div>
        </div>

        {/* 結果メッセージ */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${resultInfo.color} mb-2`}>
            {resultInfo.emoji} {resultInfo.message}
          </h2>
          <p className="text-yellow-100 text-lg">{resultInfo.description}</p>
        </div>

        {/* プログレスバー */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div
            className={`h-4 rounded-full bg-gradient-to-r ${resultInfo.bgColor}`}
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>

      {/* アクションボタン */}
      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-yellow-300"
      >
        もう一度診断する
      </button>
    </div>
  );
};

export default ResultScene;
