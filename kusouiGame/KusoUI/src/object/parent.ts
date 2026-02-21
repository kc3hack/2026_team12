import { Application, Container, Sprite, Ticker } from "pixi.js";

interface IContainerParent {
    app:Application;
}
export abstract class AlwaysExcusable extends Sprite {
    constructor(){
        super();
    }
    abstract update (_ticker:Ticker):void ;
}
export default class ContainerParent {
    private app : Application ;
    private static _instance? : ContainerParent ;

    private constructor(c:IContainerParent){
        this.app = c.app ;
    }
    /**
     * 子要素をstageに追加
     * @param container 
     */
    public addStatic(container:Container){
        this.app.stage.addChild(container);
    }
    public addDynamic(container:AlwaysExcusable){
        this.app.stage.addChild(container);
        this.app.ticker.add(container.update);
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
