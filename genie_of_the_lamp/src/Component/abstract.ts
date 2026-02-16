/**
 * 掲示板などの表示するためのUI
 */
export interface Drawable {
  /**
   * htmlに追記したいことがあれば追加する。
   */
  children?: React.ReactNode;
}

/**
 * 入力欄などのインターフェース
 */
export interface InputsInterface {
  /**
   * 入力値
   */
  value: string;
  /**
   * htmlの`Input`のpropsのonChangeに追加
   * @param value
   * @returns
   */
  onChange: (value: string) => void;
}
