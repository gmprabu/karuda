import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';
import { CommonService } from '../shared/common.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers :[ProductService]
})
export class ProductFormComponent implements OnInit {

  formSubmitAttempt: boolean = false;
  form: FormGroup;
  description: string;
  editFlag:boolean = false;
  product : Product;
  selectedFile:any = null;
  constructor(private fb: FormBuilder,  private router:Router,
    private productService:ProductService, private commonService:CommonService)  { }
  
  units = [
    {name:'Kgs',key:'KGS'},
    {name:'Litters',key: 'LTR'}
  ];

  categories = [
    {value: 'Soap', viewValue: 'Soap'},
    {value: 'Detergent', viewValue: 'Detergent'},
    {value: 'Perfume', viewValue: 'Perfume'}
  ];


  ngOnInit() {
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category :['', Validators.required],
      stock:['', Validators.required ],
      unitType : ['', Validators.required],
      image : ['', Validators.required]
    });
    this.setValues();
  }
  public setValues() {

    this.product =this.commonService.getProduct();
    if (this.product) {  
      this.editFlag = true;
      this.form.patchValue({
        id : this.product.id,
        name: this.product.name,
        description: this.product.description,
        category: this.product.category,
        stock: this.product.stock,
        unitType :this.product.unitType.type
      });
    }
  } 

  
  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  
  onFileSelected(event){
    this.selectedFile = event.target.files[0];  
    console.log(this.selectedFile);
    this.form.patchValue({ image : this.selectedFile.name });
  }
  reset(){
    this.form.patchValue({
      name: undefined,
      description: undefined,
      category : undefined,
      stock: undefined,
      unitType: undefined,
      image: undefined,
    });
    this.selectedFile = null;
  }

  onSubmit() {
    if (this.form.valid) {
      let formdata: FormData = new FormData();
      formdata.append('file', this.selectedFile);
      var myObj = {
        id : this.form.value.id,
        name: this.form.value.name,
        description:this.form.value.description ,
        category:this.form.value.category,
        stock:this.form.value.stock, 
        unitType:this.form.value.unitType};  
  
      formdata.append('product',JSON.stringify(myObj));

      if(this.editFlag){
      
      }
      else{
        this.productService.addProduct(formdata).subscribe(data => {
          this.router.navigateByUrl('/products');
        });  
      }       
    }
    this.formSubmitAttempt =true;
  }

}
