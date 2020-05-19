import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JournalConstructComponent } from './journal-construct.component';

describe('JournalConstructComponent', () => {
  let component: JournalConstructComponent;
  let fixture: ComponentFixture<JournalConstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalConstructComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JournalConstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
