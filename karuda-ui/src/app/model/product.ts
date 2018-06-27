import { UnitType } from "./unitType";

export class Product{
    id?:number;
    name:string;
    description?:string;
    category:string;
    stock:number;
    unitType:UnitType;
    image:Blob;
}