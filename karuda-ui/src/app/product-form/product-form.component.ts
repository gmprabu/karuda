import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  formSubmitAttempt: boolean = false;
  form: FormGroup;
  description: string;
  editFlag:boolean = false;
  selectedFile:any = null;
  constructor(private fb: FormBuilder,  private router:Router) { }
  
  units = [
    {name:'Kgs',key:'kg'},
    {name:'Litters',key: 'ltr'}
  ];


  ngOnInit() {
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      stock:['', Validators.required],
      unit : ['', Validators.required],
      imageName : ['', Validators.required]
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
    this.form.patchValue({ imageName : this.selectedFile.name });
  }
  reset(){
    this.form.patchValue({
      name: undefined,
      email: undefined,
      description: undefined
    });
  }
  onSubmit() {
    
    if (this.form.valid) {
      if(this.editFlag){
       
      }
      else{
       
      }       
    }
    this.formSubmitAttempt =true;
  }

}
