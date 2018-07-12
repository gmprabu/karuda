import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogsService } from '../../shared/dialogs.service';
import { Product } from '../../model/product';
import { Price } from '../../model/price';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PriceModalComponent } from '../price-modal/price-modal.component';


@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css'],
  providers: [ProductService]
})
export class PriceListComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService,
    private dialogsService: DialogsService, private commonService: CommonService,
    public dialog: MatDialog, private fb: FormBuilder) { }

  products: Product[];

  firstTime: boolean = false;
  prices: Price[];
  editFlag: boolean = false;
  displayedColumns = ['quantity', 'price', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Price>();
  priceForm: FormGroup;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.commonService.startSpinner();
    this.getAllProducts();
    this.commonService.setProduct(null);

    this.priceForm = this.fb.group({
      id:[],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.commonService.stopSpinner();
    });

  }

  definePrice(product: Product) {
    
      const dialogRef = this.dialog.open(PriceModalComponent, {
        width: '550px',
        data: [product,'test']
      });
      dialogRef.afterClosed().subscribe(result => {
       if(result != undefined && result !== "Cancel"){
        this.commonService.startSpinner();
        product.price = result;
        this.productService.priceUpdate(product).subscribe(data => {
          this.commonService.showSuccessNotification(data.message);
          product=data.responseObject;
          this.commonService.stopSpinner();
          this.dataSource = new MatTableDataSource<Price>(product.price);
        });
       }
      });
  }
  editPrice(price: Price) {
    this.editFlag = true;
    this.priceForm.patchValue({
      id: price.id,
      quantity: price.quantity,
      price: price.price
    });
  }

  open(product: Product) {
    this.firstTime = false;
    this.editFlag = false;
    this.priceForm.reset();
    this.dataSource = new MatTableDataSource<Price>(product.price);
  }

  reset(){
    this.priceForm.reset();
  }
  savePrices(product: Product) {
    if (this.priceForm.valid) {
      if (this.editFlag) {
        product.price.forEach((item, index) => {
          if(item.id == this.priceForm.value.id){
            item.price = this.priceForm.value.price;
            item.quantity = this.priceForm.value.quantity;
          }
        }); 
      } else {
        let prices: Price[] = [];
        this.commonService.startSpinner();
        let price = new Price();
        price.quantity = this.priceForm.value['quantity'];
        price.price = this.priceForm.value['price'];
        product.price.push(price);
      }
      this.productService.priceUpdate(product).subscribe(data => {
        if(this.editFlag){
          this.commonService.showSuccessNotification(data.message);
        }else{
          this.commonService.showSuccessNotification(data.message);
        }
        product = data.responseObject;
        this.priceForm.value.price='';
        this.priceForm.value.quantity='';
      });
    }
  }

  deletePrice(item: Price, product: Product) {
    this.dialogsService
      .confirm('Confirm  delete', 'Are you sure to delete this price?')
      .subscribe((res) => {
        if (res) {
          this.commonService.startSpinner();
          this.productService.priceDelete(item).subscribe(data => {
            this.commonService.showSuccessNotification(data.message);
            this.getAllProducts();
          });
        }
      });
  }


}
