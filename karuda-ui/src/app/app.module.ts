import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuardService } from './auth/role-guard.service';
import { AuthService } from './auth/auth.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { DialogsService } from './shared/dialogs.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UserCreationComponent,
    ConfirmDialogComponent,
    UserListComponent,
    ProductListComponent,
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    FlexLayoutModule
  ],
  providers: [AuthGuard,RoleGuardService,AuthService,DialogsService],
  bootstrap: [AppComponent],
  entryComponents : [UserCreationComponent,ConfirmDialogComponent]
})
export class AppModule { }
