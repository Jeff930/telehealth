import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewEntriesPage } from './view-entries.page';

describe('ViewEntriesPage', () => {
  let component: ViewEntriesPage;
  let fixture: ComponentFixture<ViewEntriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEntriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEntriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
