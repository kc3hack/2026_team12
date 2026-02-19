import { useState } from "react";
import kakiuchiImage from "../../Assets/kakiuchi.png";

class DemonController {
  constructor() {}

  public now: number = 0;

  private setPosition?: (ph: number) => void;

  private ph = 0;

  private interval = setInterval(() => {
    this.now = Math.sin(this.ph) * 4;
    if (this.setPosition) this.setPosition(this.now);
    this.ph += 0.02;
  }, 40);

  public setPositionFunction(f: (ph: number) => void) {
    this.setPosition = f;
  }
  public removeAnimation() {
    clearInterval(this.interval);
  }
}

const demon_controller = new DemonController();

const Demon = () => {
  const [position, setPosition] = useState(demon_controller.now);
  demon_controller.setPositionFunction(setPosition);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={kakiuchiImage}
                alt="kakiuchi"
                style={{
                  transform: `rotateZ(-10deg)translateY(${position + 3}rem)`,
                  width: "7rem",
                  height: "28rem",
                }}
              />
            </td>
            <td>
              <img
                src={kakiuchiImage}
                alt="kakiuchi"
                style={{
                  width: "7rem",
                  height: "28rem",
                  transform: `translateY(${position}rem)`,
                }}
              />
            </td>
            <td>
              <img
                src={kakiuchiImage}
                alt="kakiuchi"
                style={{
                  width: "7rem",
                  height: "28rem",
                  transform: `rotateZ(10deg)translateY(${position + 3}rem)`,
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const DemonImage = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        left: "0px",
        pointerEvents: "none",
      }}
    >
      <Demon></Demon>
    </div>
  );
};
export default DemonImage;
