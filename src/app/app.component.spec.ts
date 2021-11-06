import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';

import { HeaderComponent } from '@core/header/header.component';
import { AuthService } from '@core/services';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          ToastrModule.forRoot({ progressBar: true, maxOpened: 1 }),
          TranslocoRootModule,
        ],
        providers: [{ provide: AuthService, useValue: {} }, ToastrService],
        declarations: [AppComponent, HeaderComponent],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'expenses-manager-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('expenses-manager-angular');
  });
});
