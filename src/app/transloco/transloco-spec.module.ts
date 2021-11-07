import en from '../../assets/i18n/en.json';
import ro from '../../assets/i18n/ro.json';

import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';

export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, ro },
    translocoConfig: {
      availableLangs: ['en', 'ro'],
      defaultLang: 'ro',
    },
    preloadLangs: true,
    ...options,
  });
}
