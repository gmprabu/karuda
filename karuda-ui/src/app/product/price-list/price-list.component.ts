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

  definePrice(product: Product,price:Price) {
    let index = this.products.indexOf(product);
      const dialogRef = this.dialog.open(PriceModalComponent, {
        width: '550px',
        data: {'product':product,
                'price': price
              }
      });
      dialogRef.afterClosed().subscribe(result => {
       if(result != undefined && result !== "Cancel"){
        this.commonService.startSpinner();
        this.productService.priceUpdate(result).subscribe(data => {
          this.commonService.showSuccessNotification(data.message);
          this.dataSource = new MatTableDataSource<Price>(data.responseObject);
          this.products[index].price = data.responseObject;
          this.commonService.stopSpinner();
        });
       }
      });
  }
  open(product: Product) {
    this.firstTime = false;
    this.editFlag = false;
    this.priceForm.reset();
    this.dataSource = new MatTableDataSource<Price>(product.price);
  }

  deletePrice(item: Price, product: Product) {
    let index = this.products.indexOf(product);
    console.log(index);
    this.dialogsService
      .confirm('Confirm  delete', 'Are you sure to delete this price?')
      .subscribe((res) => {
        if (res) {
          this.commonService.startSpinner();
          this.productService.priceDelete(product.id,item.id).subscribe(data => {
            this.commonService.showSuccessNotification(data.message);
            this.dataSource = new MatTableDataSource<Price>(data.responseObject);
            this.products[index].price = data.responseObject;
            this.commonService.stopSpinner();
          });
        }
      });
  }


}
