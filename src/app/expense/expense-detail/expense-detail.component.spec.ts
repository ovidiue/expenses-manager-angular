import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoTestingModule } from '../../transloco/transloco-spec.module';
import { ExpenseFacade } from '../expense.facade';
import { ExpenseDetailAddComponent } from './expense-detail-add.component';

import { ToastrModule } from 'ngx-toastr';

class MockExpenseService {
  getTags = jest.fn();
  getCategories = jest.fn();
}

describe('ExpenseDetailAddComponent', () => {
  let component: ExpenseDetailAddComponent;
  let fixture: ComponentFixture<ExpenseDetailAddComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          ReactiveFormsModule,
          getTranslocoTestingModule(),
          MatDatepickerModule,
          MatNativeDateModule,
          MatCheckboxModule,
          MatSelectModule,
          MatFormFieldModule,
          MatInputModule,
          HttpClientTestingModule,
          ToastrModule.forRoot(),
        ],
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
