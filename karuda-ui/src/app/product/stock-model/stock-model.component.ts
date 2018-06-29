import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../model/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-model',
  templateUrl: './stock-model.component.html',
  styleUrls: ['./stock-model.component.css']
})
export class StockModelComponent implements OnInit {


  form: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<StockModelComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,private fb: FormBuilder) {}

  ngOnInit(): void {
   this.form = this.fb.group({
     id: [this.product.id],
    date: ['', Validators.required],
    stock :['', Validators.required],
  });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}