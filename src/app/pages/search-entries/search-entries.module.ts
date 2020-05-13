import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchEntriesPageRoutingModule } from './search-entries-routing.module';

import { SearchEntriesPage } from './search-entries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchEntriesPageRoutingModule
  ],
  declarations: [SearchEntriesPage]
})
export class SearchEntriesPageModule {}
