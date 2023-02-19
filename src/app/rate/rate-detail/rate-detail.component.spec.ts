import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoTestingModule } from '../../transloco/transloco-spec.module';
import { RateDetailAddComponent } from './rate-detail-add.component';

import { MaterialModule } from '@shared/material.module';
import { ToastrModule } from 'ngx-toastr';

describe('RateDetailAddComponent', () => {
  let component: RateDetailAddComponent;
  let fixture: ComponentFixture<RateDetailAddComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          getTranslocoTestingModule(),
          ReactiveFormsModule,
          MaterialModule,
          NoopAnimationsModule,
          ToastrModule.forRoot(),
        ],
        declarations: [RateDetailAddComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
