import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEntryPageRoutingModule } from './edit-entry-routing.module';

import { EditEntryPage } from './edit-entry.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EditEntryPageRoutingModule
  ],
  declarations: [EditEntryPage]
})
export class EditEntryPageModule {}
