import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEntriesPage } from './view-entries.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEntriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEntriesPageRoutingModule {}
