import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEntryPage } from './edit-entry.page';

describe('EditEntryPage', () => {
  let component: EditEntryPage;
  let fixture: ComponentFixture<EditEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
