import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import {
  CardViewComponent,
  CardViewListComponent,
  ChartComponent,
  ExpenseCardListComponent,
  ExpenseChartComponent,
} from '@shared/components';
import { SharedModule } from '@shared/shared.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, HttpClientTestingModule],
        declarations: [
          DashboardComponent,
          ExpenseCardListComponent,
          ExpenseChartComponent,
          CardViewListComponent,
          ChartComponent,
          CardViewComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
