import { Application } from "pixi.js";
import ContainerParent from "./object/parent";
import Kaki from "./object/kak";

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);
	ContainerParent.SetUp(app);

	new Kaki();
	
})();
