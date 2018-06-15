import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent, FooterComponent, SidebarComponent, ErrorComponent, JhiMainComponent } from './index';

@NgModule({
  imports: [
    HttpModule, MaterialModule, AppRoutingModule, BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ErrorComponent,
    JhiMainComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent, FooterComponent,JhiMainComponent, SidebarComponent, ErrorComponent, BrowserAnimationsModule
  ]
})
export class LayoutsModule {}
