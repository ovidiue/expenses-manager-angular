import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { OptionComponent, OptionSelection } from '../option/option.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'app-dropdown',
  },
})
export class DropdownComponent implements AfterContentInit {
  selectedOptionValue: OptionSelection;
  selectedOptionText = '';
  expanded = false;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    console.log('afterContentInit', this.options);
    this.options.forEach((el) => {
      el.selectOption.subscribe((elVal) => {
        console.log({ elVal });
        this.selectedOptionValue = elVal;
        this.expanded = false;
        this.options.forEach((otherEl) => {
          otherEl.selected = otherEl.value === elVal;
        });
        this._cdr.markForCheck();
      });
    });
  }
}
