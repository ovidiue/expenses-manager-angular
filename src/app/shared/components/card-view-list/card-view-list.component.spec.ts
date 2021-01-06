import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


import { SharedModule } from '@shared/shared.module';

import { CardViewListComponent } from './card-view-list.component';
import {CardViewComponent} from '@shared/components';

describe('CardViewListComponent', () => {
  let component: CardViewListComponent;
  let fixture: ComponentFixture<CardViewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CardViewListComponent, CardViewComponent],
    }).compileComponents();
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
