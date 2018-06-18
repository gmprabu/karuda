import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private router:Router) { }
  items:Array<string>= ['','','','','','','','','','',''];

  ngOnInit() {

  }
  openAddProduct(){
    this.router.navigateByUrl('/addProduct');
  }
}
