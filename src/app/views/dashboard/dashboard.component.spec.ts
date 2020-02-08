import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardViewListComponent } from '@components/card-view-list/card-view-list.component';
import { CardViewComponent } from '@components/card-view/card-view.component';
import { ChartComponent } from '@components/chart/chart.component';
import { ExpenseCardListComponent } from '@components/expense-card-list/expense-card-list.component';
import { ExpenseChartComponent } from '@components/expense-chart/expense-chart.component';

import { SharedModule } from '../../modules/shared.module';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [
        DashboardComponent,
        ExpenseCardListComponent,
        ExpenseChartComponent,
        CardViewListComponent,
        ChartComponent,
        CardViewComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
