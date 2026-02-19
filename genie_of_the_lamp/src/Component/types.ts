/**
 * 購買意欲のスコア（0.0 = 買わない, 1.0 = 即買い）
 */
type Score = number;

/**
 * 回答によって現在のスコアをどう変化させるかの関数型
 * 例: (current) => current * 0.8  (意欲を20%下げる)
 */
export type EffectFn = (currentScore: Score) => Score;

/**
 * 回答の選択肢ごとの影響度
 */
export interface Purchasability {
  /**
   * 質問に対する回答の表示よう
   */
  label: string;
  /**
   * 計算ようロジック
   */
  effect: EffectFn;
}

export type PurchaseThingType =
  | "food"
  | "furniture"
  | "fashion"
  | "electronics"
  | "books"
  | "hobby"
  | "all"
  | "other";

export interface FilteringOption {
  type: Set<PurchaseThingType>;
}
/**
 * 魔神が投げる質問の定義
 */
export type Question = {
  id: string;
  /**
   * 質問の内容
   */
  text: string;
  /**
   * 質問に対する回答
   */
  options: Purchasability[];
  /**
   * Filterよう
   */
  filter: FilteringOption;
};
