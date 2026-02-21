import { Assets, Ticker } from "pixi.js";
import ContainerParent, { AlwaysExcusable } from "./parent";
import { NormPosition } from "./n_sprite";

export default class Kaki extends AlwaysExcusable {
    private n_p : NormPosition ;
    private ph : number = 0;
    constructor(){
        const app = ContainerParent.Get();
        super();
        this.n_p = new NormPosition(this) ;
        this.init();
        app.addDynamic(this);
        this.scale.set(0.2,0.2);
        
    }
    private async init(){
        this.texture = await Assets.load("/Assets/kaki.png");
    }
    public update(_ticker: Ticker) {
        this.n_p.set({y:Math.abs(Math.sin(this.ph))});
        this.ph += 0.01 ;
    }
}