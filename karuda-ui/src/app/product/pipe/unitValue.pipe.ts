import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: 'resolveUnitValue' })
export class ResolveUnitsValues implements PipeTransform {
  transform(stock: number,unitType: string): number {
    let newStock: number = 0;
    if (unitType == 'LTR' || unitType == 'KGS') {
      newStock = stock / 1000;
    }
    else {
      newStock = stock;
    }
    return newStock;
  }
}