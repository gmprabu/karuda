import { BaseModel } from "./BaseModel";

export class Price extends BaseModel{
    id?:number;
    quantity:number;
    unitType:string;
    price?:number;

/* 
    constructor(quantity,unitType,price){
        super();
        this.quantity= quantity;
        this.unitType = unitType;
        this.price = price;
    } */
}