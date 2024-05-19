
export class User{
    constructor(
        public userCode?:Number,
        public firstName?:String,
        public lastName?:String,
        public phone?:String,
        public email?:String,
        public loginPassword?:String,
        public firstAidCertificate?:Boolean
    )
    {}
}