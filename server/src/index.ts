import type { Request, Response } from 'express';
import express, { response } from 'express';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  throw new Error("API KEY is undefined");
}

const ai = new GoogleGenAI({
  apiKey: apiKey
});

const app = express();
const PORT = 3000;

const frontendRoot = process.env.FRONTEND_ROOT;
if (!frontendRoot) {
  throw new Error("FRONTEND_ROOT is undefined");
}

const corsOptions = {
  origin: frontendRoot,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// エンドポイントの作成
app.get('/', async (req: Request, res: Response) => {
  const ai_promps = `
    本当に欲しいもの : ハイスペックパーソナルコンピュータ
  ` ;
  async function gemini_request() {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        あなたはUserが本当に欲しいものを当てるランプの魔人です。\n
        以下の情報が与えられます。\n
        ${ai_promps}\n
        これが本当に欲しいものかどうかを当てるための質問を4つ考えて以下の形式で返して下さい。ただし、返す文字列はそのまま、javascriptに読み込ませるためよけな文字列やmd形式の特殊文字が含まれていると正しく読み込まれないことに注意し、すべてjson形式で返すようにして下さい。\n
        形式...\n
        [{\n
          "question":"質問の内容",\n
          "answer":[1.8,0.2,1.0,1.3,0.7]\n
        },...]\n
        \n
        ただし"answer"は次の内容を示しています。\n
        配列の中の数字\n
        1を中心とする関係させる値で、この値を使って欲しさ変数というものに対してある処理が施されます。\n
        欲しさ変数を上げたかったら1以上の値、欲しさ変数を下げたかったら1以下の値を与えることで値が変動します。\n
        欲しさ変数は高ければ高いほど欲しいものとします。\n
        index0 ... はい\n
        index1 ... いいえ\n
        index2 ... わからない\n
        index3 ... 多分そう、部分的にそう\n
        index4 ... 多分違う、そうでもない\n
      `,

    });
    return response.text ;
  }
  const message = await gemini_request();

  if(message) {
    res.status(200);
    res.json({ message });
  }else{
    res.status(500);
    res.json({ error : "undefined"})
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
