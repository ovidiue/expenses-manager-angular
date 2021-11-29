import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  Type,
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
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: '.5' }),
        animate('200ms ease-in', style({ opacity: '1', height: '1px' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: '0', height: 'auto' })),
      ]),
    ]),
  ],
})
export class DropdownComponent implements AfterContentInit {
  selectedOptionValue: OptionSelection;
  selectedOptions: OptionSelection[] = [];
  selectedOptionText = '';
  expanded = false;
  optionComponents: Type<OptionComponent>[] = [];

  @Input() searchable = false;
  @Input() multiple = false;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    console.log('afterContentInit', this.options);
    this.options.forEach((el) => {
      el.multipleMode = this.multiple;

      el.selectOption.subscribe((elVal) => {
        console.log({ elVal });
        this.selectedOptionValue = elVal;
        this.expanded = this.multiple;
        if (!this.multiple) {
          this.options.forEach((otherEl) => {
            otherEl.selected = otherEl.value === elVal.value;
          });
        }

        if (this.multiple) {
          this.addRemoveToSelected(elVal);
        }
        this._cdr.markForCheck();
      });
    });
  }

  addRemoveToSelected(item: OptionSelection) {
    const existsInArr = this.selectedOptions.find(
      (el) => el.value === item.value
    );
    console.log({ existsInArr });
    this.selectedOptions = existsInArr
      ? [...this.selectedOptions.filter((el) => el.value !== item.value)]
      : [...this.selectedOptions, item];

    this.updateOption(item, !!existsInArr);
  }

  updateOption(option: OptionSelection, selected: boolean) {
    console.log({ option, selected });
    const optionToUpdate = this.options.find(
      (op) => op.value === option.value
    ) as OptionComponent;
    optionToUpdate.selected = selected;
  }
}
