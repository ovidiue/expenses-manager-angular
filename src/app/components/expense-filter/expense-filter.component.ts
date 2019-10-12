import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import FilterDataService from './filter-data.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
})
export class ExpenseFilterComponent implements OnInit, OnDestroy {
  categories$: Observable<SelectItem[]>;
  tags$: Observable<SelectItem[]>;

  @Output() filterChange = new EventEmitter<any>();
  private formSubscription: Subscription;
  private filterForm: FormGroup;
  private amountBetween: number[] = [0, 10000];

  constructor(
      private dataService: FilterDataService
  ) {
    this.categories$ = this.dataService.getCategories();
    this.tags$ = this.dataService.getTags();

    this.filterForm = new FormGroup({
      title: new FormControl(''),
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
    .pipe(
        debounceTime(500),
        distinctUntilChanged()
    )
    .subscribe(values => {
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
