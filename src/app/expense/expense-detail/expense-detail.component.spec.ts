import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExpenseDetailAddComponent } from './expense-detail-add.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseFacade } from '../expense.facade';

class MockExpenseService {
  getTags = jasmine.createSpy('getTags');
  getCategories = jasmine.createSpy('getCategories');
}

describe('ExpenseDetailAddComponent', () => {
  let component: ExpenseDetailAddComponent;
  let fixture: ComponentFixture<ExpenseDetailAddComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, RouterTestingModule],
        declarations: [ExpenseDetailAddComponent],
        providers: [{ provide: ExpenseFacade, useClass: MockExpenseService }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
