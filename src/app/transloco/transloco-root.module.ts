import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TranslocoModule,
  translocoConfig,
} from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly _httpClient: HttpClient) {}

  getTranslation(lang: string) {
    return this._httpClient.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'ro'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
