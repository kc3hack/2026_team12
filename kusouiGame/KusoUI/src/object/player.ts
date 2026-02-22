import { Container, Ticker } from "pixi.js";
import { AlwaysExcusable } from "./parent";
import { NormPosition } from "./n_sprite";

export default class Player extends Container implements AlwaysExcusable {
    public norm : NormPosition ;
    public speed_x : number = 10 ;
    public speed_y : number = 10 ;
    constructor(){
        super();
        document.addEventListener("keydown",(e)=>{
            this.keydown (e) ;
        });
        document.addEventListener("keyup",(e)=>{
            this.keyup (e) ;
        });
        this.norm = new NormPosition(this);
        this.norm.set({x:0.5,y:0.5});
    }
    private pressFrag = {
        right : false ,
        left : false ,
        top : false ,
        bottom : false ,
    }
    private keydown (e:KeyboardEvent) {
        if(e.key == 'a'){
            this.pressFrag.left = true ;
        }
        if(e.key == 'd'){
            this.pressFrag.right = true ;
        }
        if(e.key == 'w'){
            this.pressFrag.top = true ;
        }
        if(e.key == 's'){
            this.pressFrag.bottom = true ;
        }
    }
    private keyup (e:KeyboardEvent){
        if(e.key == 'a'){
            this.pressFrag.left = false ;
        }
        if(e.key == 'd'){
            this.pressFrag.right = false ;
        }
        if(e.key == 'w'){
            this.pressFrag.top = false ;
        }
        if(e.key == 's'){
            this.pressFrag.bottom = false ;
        }
    }
    public update = (_ticker: Ticker): void  => {
        if(this.pressFrag.left){
            this.left(_ticker.deltaTime);
        }
        if(this.pressFrag.right){
            this.right(_ticker.deltaTime);
        }
        if(this.pressFrag.top){
            this.top(_ticker.deltaTime);
        }
        if(this.pressFrag.bottom){
            this.bottom(_ticker.deltaTime);
        }
    }
    /**
     * 左方向に進む
     */
    public left (delta:number) : void {
        this.x -= this.speed_x * delta;
        if(this.norm.get().x < 0){
            this.norm.set({x:0})
        }
    }
    /**
     * 右に進む
     */
    public right (delta:number) : void {
        this.x += this.speed_x * delta;
        if(this.norm.get().x > 1 ){
            this.norm.set({x:1})
        }
    }
    /**
     * 上に進む
     */
    public top (delta:number) : void {
        this.y -= this.speed_y * delta;
        if(this.norm.get().y < 0 ){
            this.norm.set({y:0})
        }
    }
    /**
     * 下に進む
     */
    public bottom (delta:number) : void {
        this.y += this.speed_y * delta;
        if(this.norm.get().y > 1 ){
            this.norm.set({y:1})
        }
    }
}