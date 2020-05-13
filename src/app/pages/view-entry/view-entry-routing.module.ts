import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEntryPage } from './view-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEntryPageRoutingModule {}
