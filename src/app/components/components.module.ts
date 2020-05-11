import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import { JournalEntriesComponent } from './journal-entries/journal-entries.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { ViewEntryComponent} from "./view-entry/view-entry.component";

@NgModule({
  declarations: [
    SetupProfileComponent,
    ViewEntryComponent,
    JournalEntriesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SetupProfileComponent,
    ViewEntryComponent,
    JournalEntriesComponent
  ]
})
export class ComponentsModule { }
