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
import { DialogsService } from './shared/dialogs.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { CommonService } from './shared/common.service';
import { AuthInterceptor } from './auth/auth.intercept';
import { ProductModule } from './product/product.module';
import { UserMangementModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    FlexLayoutModule,
    ProductModule,
    UserMangementModule
  ],
  providers: [AuthGuard,RoleGuardService,AuthService,DialogsService,CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents : [ConfirmDialogComponent]
})
export class AppModule { }
