import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartComponent } from './expense-chart.component';
import { SharedModule } from '../../modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseChartComponent', () => {
  let component: ExpenseChartComponent;
  let fixture: ComponentFixture<ExpenseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ExpenseChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
