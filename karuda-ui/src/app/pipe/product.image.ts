import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'imageResolve'})
export class ProductImage implements PipeTransform {
  transform(value: Blob): string {
    let newStr: string = "";
    newStr = 'data:image/JPEG;base64,' + value;
    return newStr;
  }
}