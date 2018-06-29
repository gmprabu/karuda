import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../model/product';



@Component({
  selector: 'app-product',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  imageData: any;
  @Input() product:Product;

  @Output() stockUpdate = new EventEmitter<any>();

  @Output() remove = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();

  constructor() { }
  ngOnInit() {

    this.imageData = 'data:image/JPEG;base64,' + this.product.image;
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
