import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoTestingModule } from '../../transloco/transloco-spec.module';
import { CategoriesListComponent } from './categories-list.component';

import { OverlayService } from '@shared/modal/overlay.service';
import { ToastrModule } from 'ngx-toastr';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          getTranslocoTestingModule(),
          CdkTableModule,
          RouterTestingModule.withRoutes([]),
          ToastrModule.forRoot(),
          NoopAnimationsModule,
        ],
        declarations: [CategoriesListComponent],
        providers: [{ provide: OverlayService, useValue: {} }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
