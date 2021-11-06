import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseCardComponent } from './expense-card.component';

describe('ExpenseCardComponent', () => {
  let component: ExpenseCardComponent;
  let fixture: ComponentFixture<ExpenseCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExpenseCardComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCardComponent);
    component = fixture.componentInstance;
    component.expense = {
      amount: 0,
      category: undefined,
      createdOn: undefined,
      description: '',
      dueDate: undefined,
      id: 0,
      name: '',
      payed: 0,
      recurrent: false,
      tags: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
