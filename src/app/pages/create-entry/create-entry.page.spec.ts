import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEntryPage } from './create-entry.page';

describe('CreateEntryPage', () => {
  let component: CreateEntryPage;
  let fixture: ComponentFixture<CreateEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
