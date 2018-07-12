import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from '../../model/product';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Price } from '../../model/price';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.css'],
  providers: [ProductService],
})
export class PriceModalComponent implements OnInit {

  priceForm: FormGroup;


  constructor(private fb: FormBuilder, 
    private productService: ProductService,
     private commonService: CommonService,public dialogRef: MatDialogRef<PriceModalComponent>,
     @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.priceForm = this.fb.group({
      pricelist: this.fb.array([this.initItemRows()]) 
    });
    console.log(this.product);
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
     this.priceForm.value.pricelist.forEach((item, index) => {
        let price = new Price();
        price.quantity = item['quantity'];
        price.price = item['price'];
        prices.push(price);
      }); 
      this.dialogRef.close(prices);
    }
  } 
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
