import { BaseModel } from "./BaseModel";

export class Price extends BaseModel{
    id?:number;
    quantity:number;
    price?:number;
}