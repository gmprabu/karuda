import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';

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
  selectedFile:any = null;
  constructor(private fb: FormBuilder,  private router:Router,
    private productService:ProductService) { }
  
  units = [
    {name:'Kgs',key:'KGS'},
    {name:'Litters',key: 'LTR'}
  ];


  ngOnInit() {
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock:['', Validators.required],
      type : ['', Validators.required],
      image : ['', Validators.required]
    });
    this.setValues();
  }
  public setValues() {

    
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
      stock: undefined,
      type: undefined,
      image: undefined,
    });
    this.selectedFile = null;
  }

  onSubmit() {
    if (this.form.valid) {
      let formdata: FormData = new FormData();
      formdata.append('file', this.selectedFile);
      var myObj = {
        name: this.form.value.name,
        description:this.form.value.description ,
        stock:this.form.value.stock, 
        type:this.form.value.type};  
  
      formdata.append('product',JSON.stringify(myObj));

      if(this.editFlag){
      
      }
      else{
        this.productService.addProduct(formdata).subscribe(data => {
          this.router.navigateByUrl('/users');
        });  
      }       
    }
    this.formSubmitAttempt =true;
  }

}
