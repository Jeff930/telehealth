import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import { JournalEntriesComponent } from './journal-entries/journal-entries.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { ViewEntryComponent} from './view-entry/view-entry.component';
import { JournalCardComponent } from './journal-card/journal-card.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { JournalConstructComponent} from './journal-construct/journal-construct.component';

@NgModule({
  declarations: [
    SetupProfileComponent,
    ViewEntryComponent,
    JournalEntriesComponent,
    QuoteCardComponent,
    JournalCardComponent,
    JournalConstructComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SetupProfileComponent,
    ViewEntryComponent,
    JournalEntriesComponent,
    QuoteCardComponent,
    JournalCardComponent,
    JournalConstructComponent
  ]
})
export class ComponentsModule { }
