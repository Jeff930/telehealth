import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEntryPage } from './create-entry.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEntryPageRoutingModule {}
