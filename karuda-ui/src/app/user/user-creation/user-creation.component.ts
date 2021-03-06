import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { UserListService } from '../user-list/user-list.service';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'],
  providers: [UserListService]
})
export class UserCreationComponent implements OnInit {

  form: FormGroup;
  description: string;
  editFlag: boolean = false;
  constructor(private fb: FormBuilder, private commonService: CommonService,
    private userService: UserListService, private router: Router) { }
  user: User;
  formSubmitAttempt: boolean = false;
  usernameExists: boolean = false;
  emailExists: boolean = false;
  roles = [
    { name: 'User', key: 'USER' },
    { name: 'Admin', key: 'ADMIN' },
    { name: 'Super Admin', key: "SUPER_ADMIN" }
  ];


  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      
      name: new FormControl('', [Validators.required, Validators.maxLength(40),Validators.minLength(3)]),
      email:new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, 
        Validators.maxLength(15),Validators.minLength(3),Validators.pattern('^[a-zA-Z0-9_]*$')]),
      role: ['', Validators.required],
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    },
      { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
    this.setValues();
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value && !this.editFlag) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else if ((passwordConfirmationInput.value == '' || !passwordConfirmationInput.value) && !this.editFlag) {
        return passwordConfirmationInput.setErrors({ required: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt && !this.form.value.role)
    );
  }
  public setValues() {
    this.user = this.commonService.getUser();
    if (this.user) {
      this.editFlag = true;
      console.log(this.user);
      this.form.patchValue({
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        username: this.user.username,
        role: this.user.roles[0].name,
      });
    } else {
      this.form.get("password").setValidators([Validators.required,Validators.minLength(6)]);
      this.form.get("confirmPassword").setValidators(Validators.required);
    }
  }
  reset() {
    this.form.reset();
  }
  onSubmit() {

    if (this.form.valid && !this.usernameExists &&  !this.emailExists) {
      this.commonService.startSpinner();
      if (this.editFlag) {
        this.userService.updateUser(this.form.value).subscribe(data => {
          this.commonService.stopSpinner();
          this.commonService.showSuccessNotification(data.message);
          this.router.navigateByUrl('/users');
        });
      }
      else {
        this.userService.addUser(this.form.value).subscribe(data => {
          this.commonService.stopSpinner();
          this.commonService.showSuccessNotification(data.message);
          this.router.navigateByUrl('/users');
        });
      }
    }
    this.formSubmitAttempt = true;
  }

  usernameChange(){
   let name = this.form.value.username;
   if(name && name.length > 3 ){
    this.userService.checkUsernameDuplicate(name).subscribe(data => {
      console.log(data);
      if(data){
        this.usernameExists = true;
      }else{
        this.usernameExists = false;
      }
    });
   }
  }

  emailChange(){
    let email = this.form.value.email;
    if(email && this.form.get('email').valid ){
     this.userService.checkEmailDuplicate(email).subscribe(data => {
      console.log(data);
       if(data){
         this.emailExists = true;
       }else{
         this.emailExists = false;
       }
     });
    }
   }
}

