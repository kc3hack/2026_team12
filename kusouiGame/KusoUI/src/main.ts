import { Application } from "pixi.js";
import ContainerParent from "./object/parent";
import Kaki from "./object/kak";
import Player from "./object/player";

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);
	ContainerParent.SetUp(app);

	const player = new Player();
	player.addChild(new Kaki());

	app.stage.addChild(player);
	app.ticker.add(player.update);
	
})();
