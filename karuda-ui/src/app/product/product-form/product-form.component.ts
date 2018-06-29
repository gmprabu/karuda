import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';
import { Product } from '../../model/product';
import { CommonService } from '../../shared/common.service';


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
      description: new FormControl('', [Validators.minLength(5), Validators.maxLength(200)]), 
      category :['', Validators.required],
      stock:['', ],
      unitType : ['', Validators.required],
      image : ['', ]
    });
    this.setValues();
  }
  public setValues() {

    this.product =this.commonService.getProduct();
    console.log(this.product);
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
    }else{
      this.form.get("stock").setValidators(Validators.required); 
      this.form.get("image").setValidators(Validators.required); 
    }
  } 

  
  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt && !this.form.value.unitType)
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
    
      if(this.editFlag){

        this.product.name = this.form.value.name;
        this.product.description = this.form.value.description;
        this.product.category =this.form.value.category;
        let unit = this.product.unitType;
        unit.type =  this.form.value.unitType;
        this.product.unitType = unit;
        this.productService.updateProduct(this.product).subscribe(data => {
          this.router.navigateByUrl('/products');
        });  
      }
      else{
        let formdata: FormData = new FormData();
        formdata.append('file', this.selectedFile);
        var myObj = {
          id : this.form.value.id,
          name: this.form.value.name,
          description:this.form.value.description ,
          category:this.form.value.category,
          stock:this.form.value.stock, 
          unitType:this.form.value.unitType
        };  
    
        formdata.append('product',JSON.stringify(myObj));
        this.productService.addProduct(formdata).subscribe(data => {
          this.router.navigateByUrl('/products');
        });  
      }       
    }
    this.formSubmitAttempt =true;
  }

}
