import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

export interface OptionSelection {
  value: any;
  label: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appOption]',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'app-option',
  },
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: '.5' }),
        animate('200ms ease-in', style({ opacity: '1', height: '1px' })),
        animate('200ms ease-in', style({ opacity: '1', height: '10px' })),
        animate('200ms ease-in', style({ opacity: '1', height: '15px' })),
        animate('200ms ease-in', style({ opacity: '1', height: 'auto' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: '0', height: 'auto' })),
      ]),
    ]),
  ],
})
export class OptionComponent implements AfterViewInit {
  @Input()
  set multipleMode(val: boolean) {
    this._multipleMode = val;
    this._cdr.markForCheck();
  }
  get multipleMode() {
    return this._multipleMode;
  }
  @Input() selected = false;
  @Input() value: any;

  @Output() selectOption = new EventEmitter<OptionSelection>();

  @ViewChild('contentWrapper') wrapper: ElementRef<HTMLElement>;

  _multipleMode = false;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  handleClick() {
    console.log('handleClick', this.value, this.selected);
    if (!this._multipleMode) {
      // this.selected = true;
      this.selectOption.emit({
        value: this.value,
        label: this.wrapper.nativeElement.innerText,
      });
    } else {
      // this.selected = !this.selected;
      this.selectOption.emit({
        value: this.value,
        label: this.wrapper.nativeElement.innerText,
      });
    }
  }

  ngAfterViewInit(): void {
    console.log({ elRef: this.wrapper });
    console.log({ selected: this.selected, value: this.value });
  }
}
