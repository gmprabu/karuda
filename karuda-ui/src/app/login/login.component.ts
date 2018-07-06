import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { patternValidator } from '../shared/pattern-validator';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../shared/common.service';

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
    private router: Router,
    private api: CommonService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
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
      this.api.startSpinner();
      this.authService.login(this.form.value).subscribe((data: any) => {
        this.authService.setSession(data);
        this.router.navigate(['/home']);
        this.api.stopSpinner();
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.api.stopSpinner();
        });
    }
    this.formSubmitAttempt = true;

  }
}
