import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import { ViewEntryComponent} from './view-entry/view-entry.component';
import { JournalCardComponent } from './journal-card/journal-card.component';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { JournalConstructComponent} from './journal-construct/journal-construct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ViewEntryComponent,
    QuoteCardComponent,
    JournalCardComponent,
    JournalConstructComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    ViewEntryComponent,
    QuoteCardComponent,
    JournalCardComponent,
    JournalConstructComponent
  ]
})
export class ComponentsModule { }
