import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesStatisticPage } from './sales-statistic.page';

const routes: Routes = [
  {
    path: '',
    component: SalesStatisticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesStatisticPageRoutingModule {}
