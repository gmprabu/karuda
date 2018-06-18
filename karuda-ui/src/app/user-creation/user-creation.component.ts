import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { User } from '../model/user';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  form: FormGroup;
  description: string;
  editFlag:boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreationComponent>,

    
    @Inject(MAT_DIALOG_DATA)  public data: any
  ) { }

     

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.setValues();
  }

  public setValues() {
    if (this.data.data) {   
      this.editFlag = true;
      this.form.patchValue({
        name: this.data.data.name,
        email: this.data.data.email,
        username: this.data.data.username
      });
    }

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}

