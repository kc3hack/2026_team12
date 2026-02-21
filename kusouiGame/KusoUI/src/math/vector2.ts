export default class Vector2 {
    public x : number ;
    public y : number ;

    constructor(x?:number,y?:number){
        this.x = x ?? 0 ;
        this.y = y ?? 9 ;
    }
}

export type V2 = {
    x:number;
    y:number;
}
export type V2L = {
    x?:number;
    y?:number;
}