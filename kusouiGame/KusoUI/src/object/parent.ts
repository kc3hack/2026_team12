import { Application, Container, Ticker } from "pixi.js";
import Vector2 from "../math/vector2";

interface IContainerParent {
    app:Application;
}
export abstract class AlwaysExcusable extends Container {
    constructor(){
        super();
    }
    abstract update (_ticker:Ticker):void ;
}
export default class ContainerParent {
    private app : Application ;
    private static _instance? : ContainerParent ;
    public size : Vector2 ;

    private constructor(c:IContainerParent){
        this.app = c.app ;
        this.size = new Vector2(c.app.screen.width,c.app.screen.height) ;
    }
    /**
     * 子要素をstageに追加
     * @param container 
     */
    public addStatic(container:Container){
        this.app.stage.addChild(container);
    }
    /**
     * updateをtickerに追加してstageに追加します。
     * @param container 
     */
    public addDynamic(container:AlwaysExcusable){
        this.app.stage.addChild(container);
        this.app.ticker.add(container.update,container);
    }

    public static Get() : ContainerParent {
        if(ContainerParent._instance){
            return ContainerParent._instance;
        }else{
            throw new Error("ContainerParent instance not initialized. Call SetUp() first.");
        }
    }
    public static SetUp(app:Application){
        ContainerParent._instance = new ContainerParent({
            app : app ,
        });
    }
}
