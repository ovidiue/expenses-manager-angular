import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewListComponent } from './card-view-list.component';

describe('CardViewListComponent', () => {
  let component: CardViewListComponent;
  let fixture: ComponentFixture<CardViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewListComponent]
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
