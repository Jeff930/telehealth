import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEntryPageRoutingModule } from './view-entry-routing.module';

import { ViewEntryPage } from './view-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEntryPageRoutingModule
  ],
  declarations: [ViewEntryPage]
})
export class ViewEntryPageModule {}
