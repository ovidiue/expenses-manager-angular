import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewListComponent } from './card-view-list.component';
import { CardViewComponent } from '@components/card-view/card-view.component';
import { SharedModule } from '../../modules/shared.module';

describe('CardViewListComponent', () => {
  let component: CardViewListComponent;
  let fixture: ComponentFixture<CardViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CardViewListComponent, CardViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
