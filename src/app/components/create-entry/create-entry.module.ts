import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEntryPageRoutingModule } from './create-entry-routing.module';

import { CreateEntryPage } from './create-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEntryPageRoutingModule
  ],
  declarations: [CreateEntryPage]
})
export class CreateEntryPageModule {}
