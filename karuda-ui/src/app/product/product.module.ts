import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ResolveUnits } from './pipe/unit.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { StockModelComponent } from './stock-model/stock-model.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PriceModalComponent } from './price-modal/price-modal.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    ResolveUnits,
    StockModelComponent,
    PriceListComponent,
    PriceModalComponent
  ],
  entryComponents: [StockModelComponent,PriceModalComponent]
})
export class ProductModule { }
