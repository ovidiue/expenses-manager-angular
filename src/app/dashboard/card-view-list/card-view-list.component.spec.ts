import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardViewComponent } from '../card-view/card-view.component';
import { CardViewListComponent } from './card-view-list.component';

import { SharedModule } from '@shared/shared.module';

describe('CardViewListComponent', () => {
  let component: CardViewListComponent;
  let fixture: ComponentFixture<CardViewListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [CardViewListComponent, CardViewComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
