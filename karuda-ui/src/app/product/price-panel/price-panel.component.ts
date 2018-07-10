import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/product';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Price } from '../../model/price';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.css'],
  providers: [ProductService],
})
export class PricePanelComponent implements OnInit {

  @Input() product: Product;
  priceForm: FormGroup;


  constructor(private fb: FormBuilder, private productService: ProductService, private commonService: CommonService) { }
  ngOnInit() {
    this.priceForm = this.fb.group({
      pricelist: this.fb.array([this.initItemRows()]) // here
    });
  }

  initItemRows() {
    return this.fb.group({
      quantity: ['',Validators.required],
      price: ['',Validators.required],
    });
  }

  addPrice() {
    const control = <FormArray>this.priceForm.controls['pricelist'];
    control.push(this.initItemRows());
  }

  deletePrice(index: number) {
    const control = <FormArray>this.priceForm.controls['pricelist'];
    control.removeAt(index);
  }

  savePrices() {
    if (this.priceForm.valid) {
      let prices: Price[] = [];
     this.commonService.startSpinner();
     this.priceForm.value.pricelist.forEach((item, index) => {
        let price = new Price();
        price.quantity = item['quantity'];
        price.price = item['price'];
        prices.push(price);
      }); 
      this.product.price = prices;
       this.productService.updateProduct(this.product).subscribe(data => {
        this.commonService.stopSpinner();
        this.commonService.showSuccessNotification(data.message);
      });
    }
  } 

}
