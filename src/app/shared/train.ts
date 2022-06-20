export class TRain {
    constructor(
    public id:number,
    public locationLng:number,
    public locationLat:number,
    public direction:string,
    public type:string,
    ) {}

}


export class Location {
    constructor(
    public locationLng:number,
    public locationLat:number,
    ) {}

}



export class Train {
    constructor(
    public trainId:number,
    public timeLeft:string,
    ) {}

}