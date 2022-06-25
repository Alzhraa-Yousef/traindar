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

export class Points {
    constructor(
        public pointnumber:string,
        public cardnumber:string,
        public expirydate:string,
        public securitycode :string,
        ) {}

}


export class Pointshistory {
    constructor(
        public points:string,
        public from:string,
        public to:string,
        public date :string,
        public details :string,
        ) {}

}


