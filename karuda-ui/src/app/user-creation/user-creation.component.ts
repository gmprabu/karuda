import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { User } from '../model/user';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  form: FormGroup;
  description: string;
  editFlag:boolean = false;
  constructor(private fb: FormBuilder, private commonService:CommonService) { }
  user:User;

  roles = [
    'User',
    'Admin',
    'Super Admin',
  ];
     

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
    this.setValues();
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else if( passwordConfirmationInput.value == ''){
        return passwordConfirmationInput.setErrors({required: true})
      }
      else{
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  public setValues() {
    this.user =this.commonService.getUser();
    if (this.user) {  
      this.editFlag = true;
      this.form.get("password").clearValidators();
      this.form.get("confirmPassword").clearValidators();
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        username: this.user.username,
       // role :this.user.role,
      });
    }
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
    console.log(this.form.value);
          
    }}

}

