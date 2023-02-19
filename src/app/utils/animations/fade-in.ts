import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(200, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(200, style({ opacity: 0 })),
  ]),
]);
