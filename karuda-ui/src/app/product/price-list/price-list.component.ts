import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../../shared/common.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogsService } from '../../shared/dialogs.service';
import { Product } from '../../model/product';
import { Price } from '../../model/price';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  firstTime:boolean = false;
  prices: Price[];
  displayedColumns = ['quantity', 'price', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Price>();

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.commonService.startSpinner();
    this.getAllProducts();
    this.commonService.setProduct(null);
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
     
      this.commonService.stopSpinner();
    });

  }

  definePrice(product: Product) {
    product.price.push(new Price());
    this.firstTime = true;
  }

  open(product:Product){
    this.dataSource = new MatTableDataSource<Price>(product.price);
  }


}
