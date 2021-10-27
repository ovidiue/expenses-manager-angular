import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ExpenseFacade } from '../expense.facade';

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
})
export class ExpenseFilterComponent implements OnInit, OnDestroy {
  categories$ = this.expenseFacade.categories$;
  tags$ = this.expenseFacade.tags$;

  @Output() filterChange = new EventEmitter<any>();
  filterForm: FormGroup;
  amountBetween: number[] = [0, 10000];
  private formSubscription: Subscription;

  constructor(private readonly expenseFacade: ExpenseFacade) {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      tags: new FormControl([]),
      createdBetween: new FormControl(''),
      dueBetween: new FormControl(''),
      recurrent: new FormControl(false),
      amount: new FormControl([0, 10000]),
    });
  }

  ngOnInit(): void {
    this.formSubscription = this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((values) => {
        this.filterChange.emit(this.filterForm.value);
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  filterUpdate(val: any) {
    val !== null
      ? this.filterForm.controls[val].reset()
      : this.filterForm.reset();
  }
}
