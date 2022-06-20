export class Userregister {
    constructor(
    public name:string,
    public password:string,
    public email:string,
    public phone:string,
    public points:number,
    //public date:string,
    ) {}

}


export class Userlogin {
    constructor(
    public email:string,
    public password:string,) {}

}



export class AddetionalInformation {
    constructor(
        public email:string,
        public confirmpass:string,
        public message:string,
        public gender :string,
        public code:string) {}

}



