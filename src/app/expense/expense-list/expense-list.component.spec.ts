import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExpenseFilterComponent } from '../expense-filter/expense-filter.component';
import { ExpenseListComponent } from './expense-list.component';

import { ShortFilterComponent } from '@shared/components';
import { SharedModule } from '@shared/shared.module';

describe('ExpensesComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
        declarations: [
          ExpenseListComponent,
          ExpenseFilterComponent,
          ShortFilterComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
