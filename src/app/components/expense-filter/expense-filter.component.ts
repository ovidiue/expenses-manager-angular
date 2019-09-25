import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import FilterDataService from './filter-data.service';
import { Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';

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
  private beautifiedFilters: string[] = [];
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
      amount: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.formSubscription = this.filterForm.valueChanges
    .subscribe(values => this.beautifiedFilters = this.parseFilters(values));
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  clearFormFilters($event): void {
    console.log('clearFormFilters called');
    this.filterForm.reset();
    this.filterChange.emit(this.filterForm.value);
  }

  emitValues(): void {
    this.beautifiedFilters = this.parseFilters(this.filterForm.value);
    this.filterChange.emit(this.filterForm.value);
  }

  parseFilters(obj: any): string[] {
    const result = [];
    if (obj) {
      for (const key in obj) {
        if (obj[key] !== '' && obj[key] !== null) {
          let value = '';
          switch (key) {
            case 'amount':
              value = 'Amount between: ' + obj[key][0] + '-' + obj[key][1];
              break;
            case 'category':
              value = 'Category: ' + obj[key].name;
              break;
            case 'createdBetween':
              value = 'Created between: ' + moment(obj[key][0]).format('L') + ' - ' +
                  moment(obj[key][1]).format('L');
              break;
            case 'dueBetween':
              value = 'Due between: ' + moment(obj[key][0]).format('L') + ' - ' +
                  moment(obj[key][1]).format('L');
              break;
            case 'title':
              value = 'Title contains: ' + obj[key];
              break;
            case 'description':
              value = 'Description contains: ' + obj[key];
              break;
            case 'recurrent':
              value = 'Recurrent: ' + obj[key];
              break;
            case 'tags':
              value = 'Tags: ' + obj[key].map(el => el.name).concat();
              break;
          }
          result.push(value);
        }
      }
    }
    return result;
  }
}
