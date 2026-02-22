import { Assets, Sprite, Ticker } from "pixi.js";
import { AlwaysExcusable } from "./parent";
import { NormPosition } from "./n_sprite";

export default class Kaki extends Sprite implements AlwaysExcusable {
    private n_p : NormPosition ;
    private ph : number = 0;
    constructor(){
        super();
        this.n_p = new NormPosition(this) ;
        this.init();
        this.scale.set(0.2,0.2);
        this.anchor.set(0.5, 0.5);
    }
    private async init(){
        this.texture = await Assets.load("/Assets/kaki.png");
    }
    public update(_ticker: Ticker) {
        this.n_p.set({y:Math.abs(Math.sin(this.ph))});
        this.ph += 0.01 ;
    }
}