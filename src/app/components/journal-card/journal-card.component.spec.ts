import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JournalCardComponent } from './journal-card.component';

describe('JournalCardComponent', () => {
  let component: JournalCardComponent;
  let fixture: ComponentFixture<JournalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JournalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
