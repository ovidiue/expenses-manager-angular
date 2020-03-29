import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpenseFilterComponent } from '@components/../../views/expense/expense-filter/expense-filter.component';
import { ShortFilterComponent } from '@components/short-filter/short-filter.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '../../modules/shared.module';
import { ExpenseListComponent } from '../../views/expense/expense-list/expense-list.component';
import { ExpensesDataService } from '../../views/expense/expense-list/expenses-data.service';

import { DialogRatesComponent } from './dialog-rates.component';

describe('DialogRatesComponent', () => {
  let component: DialogRatesComponent;
  let fixture: ComponentFixture<DialogRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, DialogModule, RouterTestingModule],
      declarations: [
        DialogRatesComponent,
        ExpenseListComponent,
        ExpenseFilterComponent,
        ShortFilterComponent
      ],
      providers: [
        DialogService,
        DynamicDialogConfig,
        ExpensesDataService,
        {provide: DynamicDialogRef, use: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRatesComponent);
    component = fixture.componentInstance;
    component.config = {data: {resp: {content: []}}};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
