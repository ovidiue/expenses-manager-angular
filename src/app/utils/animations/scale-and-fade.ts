import { animate, style, transition, trigger } from '@angular/animations';

export const scaleAndFade = trigger('scaleAndFade', [
  transition(':leave', [
    animate(100, style({ transform: 'scale(1.1)' })),
    animate(100, style({ transform: 'scale(1)' })),
    animate(100, style({ opacity: '0.5' })),
    animate(100, style({ opacity: '0' })),
  ]),
]);
