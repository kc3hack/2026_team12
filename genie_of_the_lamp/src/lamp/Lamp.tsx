import type { Drawable } from "../Component/abstract";

interface ILampIntroduceScreen extends Drawable {
  name?: string;
}
/**
 * ランプの魔人の自己紹介パネルを表示
 * @param Props
 * @returns jsx.Element
 */
const LampIntroduceScreen = ({
  children,
  name = "ランプの魔人",
}: ILampIntroduceScreen) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-green-500">
        やあ、私は{name}です
      </h3>
      <p className="text-sm leading-relaxed text-slate-200">
        欲しいものを思い浮かべて.
        <br />
        魔人がなんでも当ててみせよう。魔人は何でもお見通しさ
      </p>
      {children}
    </div>
  );
};

export default LampIntroduceScreen;
