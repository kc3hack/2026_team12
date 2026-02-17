import LampIntroduceScreen from "./lamp/Lamp";
// rio追加
import StartScene from "./Screen/Start/Start";

function App() {
  return (
    <div>
      <div>
        <LampIntroduceScreen />
      </div>
      {/* rio追加 */}
      <div className="flex justify-center">
        <StartScene
          type="start"
          onStart={() => {
            console.log("スタート押された");
          }}
        />
      </div>
    </div>
  );
}

export default App;
