import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchEntriesPage } from './search-entries.page';

describe('SearchEntriesPage', () => {
  let component: SearchEntriesPage;
  let fixture: ComponentFixture<SearchEntriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEntriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEntriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
