import { BaseModel } from "./BaseModel";

export class Price extends BaseModel{
    id?:number;
    quantity:number;
    unitType:string;
    price?:number;
}