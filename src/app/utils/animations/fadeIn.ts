import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    // :enter is alias to 'void => *'
    style({ opacity: 0 }),
    animate(200, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    // :leave is alias to '* => void'
    animate(200, style({ opacity: 0 })),
  ]),
]);
