import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { DialogsService } from '../../shared/dialogs.service';
import { CommonService } from '../../shared/common.service';
import { Product } from '../../model/product';
import { MatDialog } from '@angular/material';
import { StockModelComponent } from '../stock-model/stock-model.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers :[ProductService]
})
export class ProductListComponent implements OnInit {

  constructor(private router:Router, private productService:ProductService,
    private dialogsService: DialogsService, private commonService:CommonService,
    public dialog: MatDialog) { }

  products:Product[];
   
  ngOnInit() {
    this. getAllProducts();
    this.commonService.setProduct(null);
  }

  getAllProducts() {
    this.commonService.startSpinner();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.commonService.stopSpinner();
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
    
    const dialogRef = this.dialog.open(StockModelComponent, {
      width: '450px',
      data: value.inputs
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result != undefined && result !== "Cancel"){
/*       const d: Date = new Date(result.date);
      result.date = d.getTime; */
      this.commonService.startSpinner();
      this.productService.stockUpdate(result).subscribe((data) => {
        this.commonService.showSuccessNotification(data.message);
          this.getAllProducts();
      });
     }
    });
  }
  removeProduct(value){
    this.dialogsService
    .confirm('Confirm  delete', 'Are you sure to delete this product?')
    .subscribe((res) => {
      if (res) {
        this.commonService.stopSpinner();
        this.productService.removeProduct(value.inputs).subscribe((data) => {
          this.commonService.showSuccessNotification(data.message);
          this.getAllProducts();
        });
      }
    });
   
  }
}
