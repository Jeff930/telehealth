import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEntriesPageRoutingModule } from './view-entries-routing.module';

import { ViewEntriesPage } from './view-entries.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewEntriesPageRoutingModule
  ],
  declarations: [ViewEntriesPage]
})
export class ViewEntriesPageModule {}
