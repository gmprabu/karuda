import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';
import { MatDialog } from '@angular/material';
import { DialogsService } from '../../shared/dialogs.service';
import { Product } from '../../model/product';
import { Price } from '../../model/price';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css'],
  providers:[ProductService]
})
export class PriceListComponent implements OnInit {
  
  constructor(private router:Router, private productService:ProductService,
    private dialogsService: DialogsService, private commonService:CommonService,
    public dialog: MatDialog) { }

  products:Product[];

  prices:Price[];
   
  unitsLiquid = [
    { name: 'Milliliter', key: 'ml' },
    { name: 'Litter', key: 'l' }
  ];

  unitsSolid = [
    { name: 'Gram', key: 'g' },
    { name: 'Kilogram', key: 'kg' }
  ];


  ngOnInit() {
    this.commonService.startSpinner();
    this. getAllProducts();
    this.commonService.setProduct(null);
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.commonService.stopSpinner();
    });
    
  }

  getUnitType(type:String){

    if(type == "KGS"){
      return this.unitsSolid;
    }else if(type == "LTR"){
      return this.unitsLiquid;
    }
  }

  definePrice(product : Product){
    product.price.push(new Price());
  }
}
