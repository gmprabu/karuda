import { UnitType } from "./unitType";
import { BaseModel } from "./BaseModel";
import { Price } from "./price";

export class Product extends BaseModel{
    id?:number;
    name:string;
    description?:string;
    category:string;
    stock:number;
    unitType:UnitType;
    image:Blob;
    price:Price[];
}