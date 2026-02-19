import kakiuchiImage from "../../Assets/kakiuchi.png";

const Demon = () => {
  return (
    <div>
      <img
        src={kakiuchiImage}
        alt="kakiuchi"
        style={{ width: "40%", height: "40%" }}
      />
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
