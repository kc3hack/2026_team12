import type { Request, Response } from 'express';
import express from 'express';

const app = express();
const PORT = 3000;

// 型の定義（インターフェース）
interface Wish {
  id: number;
  content: string;
}

app.use(express.json());

// エンドポイントの作成
app.get('/api/lamp', (req: Request, res: Response) => {
  const message: string = "私はランプの魔人。願いを言ってみせよ。";
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
