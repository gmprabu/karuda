import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form: FormGroup;
  description: string;
  editFlag:boolean = false;
  constructor(private fb: FormBuilder,  private router:Router) { }



  ngOnInit() {
    this.form = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', ],
      confirmPassword: ['', ]
    });
    this.setValues();
  }
  public setValues() {

    
  } 
  reset(){
    this.form.patchValue({
      name: undefined,
      email: undefined,
      username: undefined,
      password:undefined,
      confirmPassword:undefined,
      role:undefined
    });
  }
  onSubmit() {
    
    if (this.form.valid) {
      if(this.editFlag){
       
      }
      else{
       
      }       
    }}

}
