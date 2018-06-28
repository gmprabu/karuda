import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from '../model/product';
import { DialogsService } from '../shared/dialogs.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers :[ProductService]
})
export class ProductListComponent implements OnInit {

  constructor(private router:Router, private productService:ProductService,
    private dialogsService: DialogsService, private commonService:CommonService) { }

  products:Product[];
   
  ngOnInit() {
    this. getAllProducts();
    this.commonService.setProduct(null);
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  openAddProduct(){
    this.router.navigateByUrl('/addProduct');
  }

  editProduct(value){
    this.commonService.setProduct(value.inputs);
    this.router.navigateByUrl('/editProduct');
  }
  addStock(value){
  
  }
  removeProduct(value){
    this.dialogsService
    .confirm('Confirm  delete', 'Are you sure to delete this product?')
    .subscribe((res) => {
      if (res) {
        this.productService.removeProduct(value.inputs).subscribe((data) => {
          this.getAllProducts();
        });
      }
    });
   
  }
}
