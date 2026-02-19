import type { Request, Response } from 'express';
import express, { response } from 'express';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

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


app.use(express.json());

// エンドポイントの作成
app.get('/', async (req: Request, res: Response) => {
  async function gemini_request() {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
    return response.text ;
  }
  const message = await gemini_request();

  if(message) {
    res.status(200);
    res.json({ message });
  }else{
    res.status(405);
    res.json({ error : "undefined"})
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
