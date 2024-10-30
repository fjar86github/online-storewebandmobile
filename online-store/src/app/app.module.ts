import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductSearchComponent } from './components/product-search/product-search.component';

import { HomePage } from './home/home.page';

//import { NavController } from '@ionic/angular';

import { ExportPage } from './export/export.page'; // Make sure this import is correct



@NgModule({
  declarations: [AppComponent,LoginComponent,ProductFormComponent,ProductListComponent,ProductSearchComponent,HomePage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule,FormsModule,IonicModule,HttpClientModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
