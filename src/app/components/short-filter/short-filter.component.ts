import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-short-filter',
  templateUrl: './short-filter.component.html',
  styleUrls: ['./short-filter.component.scss'],
})
export class ShortFilterComponent implements OnChanges {
  @Input() filter: any;
  @Output() removeFilter = new EventEmitter<any>();
  parsedFilter: object[] = [];

  // TODO fix range value initialization
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.parsedFilter = this.parseFilters(changes.filter.currentValue);
  }

  removeExistingTag(val: string) {
    this.removeFilter.emit(val);
  }

  parseFilters(obj: any): object[] {
    const result = [];
    if (obj) {
      for (const key in obj) {
        if (obj[key] !== '' && obj[key] !== null) {
          const object: any = {};
          switch (key) {
            case 'amount':
              object.label = 'Amount between: ' + obj[key][0] + '-' + obj[key][1];
              object.value = 'amount';
              break;
            case 'category':
              object.label = 'Category: ' + obj[key].name;
              object.value = 'category';
              break;
            case 'createdBetween':
              object.label =
                'Created between: ' +
                moment(obj[key][0]).format('L') +
                ' - ' +
                moment(obj[key][1]).format('L');
              object.value = 'createdBetween';
              break;
            case 'dueBetween':
              object.label =
                'Due between: ' +
                moment(obj[key][0]).format('L') +
                ' - ' +
                moment(obj[key][1]).format('L');
              object.value = 'dueBetween';
              break;
            case 'title':
              object.label = 'Title contains: ' + obj[key];
              object.value = 'title';
              break;
            case 'description':
              object.label = 'Description contains: ' + obj[key];
              object.value = 'description';
              break;
            case 'recurrent':
              if (obj[key]) {
                object.label = 'Recurrent: ' + obj[key];
                object.value = 'recurrent';
              }
              break;
            case 'tags':
              if (obj[key].length) {
                object.label = 'Tags: ' + obj[key].map((el) => el.name).concat();
                object.value = 'tags';
              }
              break;
          }
          if (Object.keys(object).length) {
            result.push(object);
          }
        }
      }
    }
    return result;
  }

  removeAll() {
    this.removeFilter.emit(null);
  }

  areFiltersEmpty() {
    return !this.parsedFilter.length;
  }
}
