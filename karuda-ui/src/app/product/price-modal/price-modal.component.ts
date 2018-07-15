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
  product: Product;
  price: Price;

  unitsLiquid = [
        { name: 'Milliliter', key: 'ml' },
        { name: 'Litter', key: 'l' }
      ];
      unitsSolid = [
        { name: 'Gram', key: 'g' },
        { name: 'Kilogram', key: 'kg' }
      ];

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private commonService: CommonService, public dialogRef: MatDialogRef<PriceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.priceForm = this.fb.group({
      pricelist: this.fb.array([this.initItemRows()])
    });
    this.product = this.data.product;
    this.price = this.data.price;
    this.setValues();
  }

  getUnitType(type: String) {
        if (type == "KGS") {
          return this.unitsSolid;
        } else if (type == "LTR") {
          return this.unitsLiquid;
        }
      }

  initItemRows() {
    return this.fb.group({
      id: [],
      quantity: ['', Validators.required],
      unitType: ['', Validators.required],
      price: ['', Validators.required],
    });
   
  }

  setValues() {
    if (this.price) {
      this.priceForm['controls']['pricelist']['controls'][0].patchValue({
        id: this.price.id,
        quantity: this.price.quantity,
        unitType: this.price.unitType,
        price: this.price.price
      });
    } 
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
      if (this.product.price.length > 0 && !this.price) {
        this.addNewPrice();
      } else if(this.product.price.length > 0 && this.price) {
        this.editPrice();
      } else {
        this.addPriceFirstTime();
      }
      this.dialogRef.close(this.product);
    }
  }

  onPriceChange(){
    console.log('test');
  }

  createPriceObject(item:any):Price{
    let price = new Price();
    price.quantity = item['quantity'];
    price.unitType = item['unitType'];
    price.price = item['price'];
    return price;
  }

  addPriceFirstTime() {
    let prices: Price[] = [];
    this.priceForm.value.pricelist.forEach((item, index) => {
      prices.push(this.createPriceObject(item));
    });
    this.product.price = prices;
  }

  addNewPrice() {
    this.priceForm.value.pricelist.forEach((item, index) => {
      this.product.price.push(this.createPriceObject(item));
    });
  }

  editPrice() {
    this.priceForm.value.pricelist.forEach((item, index) => {
      this.product.price.forEach((price, index) => {
        if (price.id == item.id) {
          price.quantity = item['quantity'];
          price.unitType = item['unitType'];
          price.price = item['price'];
        }
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}
