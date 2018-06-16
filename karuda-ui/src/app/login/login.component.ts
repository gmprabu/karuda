import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { patternValidator } from '../shared/pattern-validator';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  isLoginError: boolean;
  form: FormGroup;                   
  private formSubmitAttempt: boolean; 

  constructor(
    private fb: FormBuilder,         
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.router.navigate(['/home']);
    }
    this.form = this.fb.group({    
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
    console.log(this.form.value); 
    this.authService.login(this.form.value).subscribe((data : any)=>{
      this.authService.setSession(data);
      console.log(data);
      this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      console.log('failed' + err);
      this.isLoginError = true;
    });    
    }
    this.formSubmitAttempt = true; 
          
  }
}
