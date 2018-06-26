import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../model/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:Product;

  @Output() stockUpdate = new EventEmitter<any>();

  @Output() remove = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();

  constructor() { }
  ngOnInit() {
  }
  editProduct(){
    this.edit.emit({ inputs: this.product });
  }
  addStock(){
    this.stockUpdate.emit({ inputs: this.product });
  }
  removeProduct(){
    this.remove.emit({ inputs: this.product });
  }
}
