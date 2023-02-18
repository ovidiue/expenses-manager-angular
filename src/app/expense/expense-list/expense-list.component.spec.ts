import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { OverlayService } from '@shared/modal/overlay.service';
import { ToastrModule } from 'ngx-toastr';

import { TranslocoRootModule } from '../../transloco/transloco-root.module';
import { ExpenseListComponent } from './expense-list.component';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslocoRootModule,
        CdkTableModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [ExpenseListComponent],
      providers: [{ provide: OverlayService, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
