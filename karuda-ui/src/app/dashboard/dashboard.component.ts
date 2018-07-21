import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogsService } from '../shared/dialogs.service';
import { ProductService } from '../product/product-list/product.service';
import { CommonService } from '../shared/common.service';
import { Product } from '../model/product';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProductService]
})
export class DashboardComponent implements OnInit {

  products:Product[];
  displayedColumns = ['index','name','quantity', 'price'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();

  constructor(private productService:ProductService,
    private dialogsService: DialogsService, private commonService:CommonService,
    public dialog: MatDialog,private auth: AuthService ) { }
    
  ngOnInit() {
    this. getAllProducts();
    this.dataSource.paginator = this.paginator;
    this.commonService.setProduct(null);
  }

  getAllProducts() {
    this.commonService.startSpinner();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.commonService.stopSpinner();
    });
    
  }
  


  logout(){
    this.auth.logout();
  }
}
