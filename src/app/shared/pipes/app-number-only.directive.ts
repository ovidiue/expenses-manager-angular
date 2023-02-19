import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appNumberOnly]' })
export class AppNumberOnlyDirective {
  constructor(private readonly _elRef: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const elValue = this._elRef.nativeElement.value;
    this._elRef.nativeElement.value = elValue.replace(/[^0-9]*/g, '');
    if (elValue !== this._elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
