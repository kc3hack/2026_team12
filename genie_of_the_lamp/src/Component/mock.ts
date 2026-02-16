import type { Question } from "./types";

export const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "それは、今持っているもので代用できませんか？",
    options: [
      { label: "絶対に無理", effect: (s) => s }, // 100%維持
      { label: "工夫すればできる", effect: (s) => s * 0.5 }, // 半減
      { label: "似たようなの持ってる", effect: (s) => s * 0.2 }, // 激減
    ],
  },
  {
    id: "q2",
    text: "一ヶ月後、それを使いこなしている自分を想像できますか？",
    options: [
      { label: "確信がある", effect: (s) => s },
      { label: "たぶん...", effect: (s) => s * 0.7 },
      { label: "埃をかぶってるかも", effect: (s) => s * 0.1 },
    ],
  },
  {
    id: "q3",
    text: "もし今、値段が1.5倍に上がっても買いますか？",
    options: [
      { label: "それでも買う", effect: (s) => s * 1.1 }, // むしろ価値が高いと判断して微増
      { label: "迷う", effect: (s) => s * 0.8 },
      { label: "買わない", effect: (s) => s * 0.4 },
    ],
  },
];
