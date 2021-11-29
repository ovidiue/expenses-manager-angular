import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
})
export class OptionComponent implements AfterViewInit {
  @Input() selected = false;
  @Input() value: any;

  @Output() selectOption = new EventEmitter<OptionSelection>();

  @ViewChild('contentWrapper') wrapper: ElementRef<HTMLElement>;

  handleClick() {
    console.log('handleClick', this.value, this.selected);
    this.selected = true;
    this.selectOption.emit({
      value: this.value,
      label: this.wrapper.nativeElement.innerText,
    });
  }

  ngAfterViewInit(): void {
    console.log({ elRef: this.wrapper });
    console.log({ selected: this.selected, value: this.value });
  }
}
