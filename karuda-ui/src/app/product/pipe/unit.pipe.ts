import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'resolveUnits'})
export class ResolveUnits implements PipeTransform {
  transform(value: string): string {
    let newStr: string = "";
    if(value == 'LTR'){
        newStr = "Litters"
    }
    else if(value == 'KGS'){
        newStr = "Kgs"
    }
    return newStr;
  }
}