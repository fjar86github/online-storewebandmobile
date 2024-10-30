import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesStatisticPageRoutingModule } from './sales-statistic-routing.module';

import { SalesStatisticPage } from './sales-statistic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesStatisticPageRoutingModule
  ],
  declarations: [SalesStatisticPage]
})
export class SalesStatisticPageModule {}
