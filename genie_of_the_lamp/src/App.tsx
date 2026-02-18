import MainController from "./Controller/MainController";
import LampIntroduceScreen from "./lamp/Lamp";

function App() {
  return (
    <div>
      <div>
        <LampIntroduceScreen />
        <MainController></MainController>
      </div>
    </div>
  );
}

export default App;
