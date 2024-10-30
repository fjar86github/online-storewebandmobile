import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportPageRoutingModule } from './export-routing.module';

import { ExportPage } from './export.page';

import { ReactiveFormsModule } from '@angular/forms'; // Import this
import { HttpClientModule } from '@angular/common/http'; // Make sure to import HttpClientModule if you are using HttpClient

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportPageRoutingModule,ReactiveFormsModule,HttpClientModule
  ],
  declarations: [ExportPage]
})
export class ExportPageModule {}
