import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseChartComponent } from './expense-chart.component';

import { SharedModule } from '@shared/shared.module';

describe('ExpenseChartComponent', () => {
  let component: ExpenseChartComponent;
  let fixture: ComponentFixture<ExpenseChartComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, HttpClientTestingModule],
        declarations: [ExpenseChartComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
