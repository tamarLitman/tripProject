import { Time } from "@angular/common";

export class trip{
    constructor(
        public tripCode?:number,
        public tripDestination?:String,
        public typeCode?:number,
        public tripDate?:Date,
        // public departureTime?:Time,
        public tripDurationHours?:number,
        public availablePlaces?:number,
        public price?:number,
        public photo?:String,
        public typeName?:String,
        public isFirstAid?:boolean
    )
    {}
}