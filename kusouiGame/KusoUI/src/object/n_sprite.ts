import { Container } from "pixi.js";
import ContainerParent from "./parent";
import Vector2, { V2, V2L } from "../math/vector2";

/**
 * 正規化された位置情報で処理可能にするモジュールです。
 */
export class NormPosition {
    private container : Container ;
    private size : Vector2 ;

    constructor(c:Container) {
        this.container = c ;
        const p = ContainerParent.Get() ;
        this.size = p.size ;
    }

    public set (v2:V2L) {
        if(v2.x !== undefined) this.container.x = v2.x*this.size.x ;
        if(v2.y !== undefined) this.container.y = v2.y*this.size.y ;
    }
    public add (v2:V2L) {
        if(v2.x !== undefined) this.container.x += v2.x*this.size.x ;
        if(v2.y !== undefined) this.container.y += v2.y*this.size.y ;
    }
    public get () : V2 {
        return {
            x: this.container.x / this.size.x ,
            y: this.container.y / this.size.y ,
        }
    }
}