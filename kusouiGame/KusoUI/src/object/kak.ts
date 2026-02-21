import { Assets, Ticker } from "pixi.js";
import ContainerParent, { AlwaysExcusable } from "./parent";

export default class Kaki extends AlwaysExcusable {
    constructor(){
        const app = ContainerParent.Get();
        super();
        this.init();
        app.addDynamic(this);
        this.scale.set(0.2,0.2);
    }
    private async init(){
        this.texture = await Assets.load("/Assets/kaki.png");
    }
    public update(_ticker: Ticker) {
        
    }
}