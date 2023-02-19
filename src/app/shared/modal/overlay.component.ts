import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef, Type } from '@angular/core';

import { MyOverlayRef } from '@shared/modal/myoverlay-ref';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('enlarge', [
      transition(':enter', [
        style({ opacity: 0.2 }),
        animate(50, style({ transform: 'scale(.2)' })),
        style({ opacity: 0.4 }),
        animate(50, style({ transform: 'scale(.4)' })),
        style({ opacity: 0.6 }),
        animate(50, style({ transform: 'scale(.6)' })),
        style({ opacity: 0.8 }),
        animate(50, style({ transform: 'scale(.8)' })),
        style({ opacity: 1 }),
        animate(50, style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class OverlayComponent implements OnInit {
  contentType: 'template' | 'string' | 'component';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string | TemplateRef<any> | Type<any>;
  context;

  constructor(private ref: MyOverlayRef) {}

  close(data?: boolean) {
    this.ref.close(data);
  }

  ngOnInit() {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref),
      };
    } else {
      this.contentType = 'component';
    }
  }
}
