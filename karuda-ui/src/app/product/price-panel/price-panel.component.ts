import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Price } from '../../model/price';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.css'],
  providers : [ProductService],
})
export class PricePanelComponent implements OnInit {


 
  @Input() product: Product;
  form: FormGroup = this.fb.group({});


  unitsLiquid = [
    { name: 'Milliliter', key: 'ml' },
    { name: 'Litter', key: 'l' }
  ];
  unitsSolid = [
    { name: 'Gram', key: 'g' },
    { name: 'Kilogram', key: 'kg' }
  ];

  constructor(private fb: FormBuilder,private productService : ProductService, private commonService: CommonService) { }
  ngOnInit() {
    this.product.price.forEach((item, index) => {
      this.addFormControl(index);
    });
  }
  getUnitType(type: String) {

    if (type == "KGS") {
      return this.unitsSolid;
    } else if (type == "LTR") {
      return this.unitsLiquid;
    }
  }

  addFormControl(index: Number) {
    this.form.addControl('quantity' + index, new FormControl('', Validators.required));
    this.form.addControl('unitType' + index, new FormControl('', Validators.required));
    this.form.addControl('price' + index, new FormControl('', Validators.required));
  }

  definePrice(product: Product) {
    product.price.push(new Price());
    this.addFormControl(this.product.price.length - 1);
  }
  removePrice(product: Product, index: number) {
    if (index !== -1) {
      product.price.splice(index, 1);
    }
    this.reDefineFormControl();
  }

  reDefineFormControl() {
    this.form = this.fb.group({});
    this.product.price.forEach((item, index) => {
      this.addFormControl(index);
    }); 
    console.log(this.form);
  }


  getControlname(name: string, index: number): String {
    return name + index;
  }

  savePrices() {
    if (this.form.valid) {
      let prices:Price[]=[];
      this.commonService.startSpinner();
      this.product.price.forEach((item, index) => {
        let price = new Price();

        price.quantity = this.form.value['quantity'+index];
        price.unitType = this.form.value['unitType'+index];
        price.price =  this.form.value['price'+index];
        prices.push(price);
      }); 
      this.product.price=prices;
      this.productService.updateProduct(this.product).subscribe(data => {
        this.commonService.stopSpinner();
        this.commonService.showSuccessNotification(data.message);
      });
    }
  }

}
