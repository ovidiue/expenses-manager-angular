import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoTestingModule } from '../../transloco/transloco-spec.module';
import { TagListComponent } from './tag-list.component';

import { OverlayService } from '@shared/modal/overlay.service';
import { ToastrModule } from 'ngx-toastr';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          getTranslocoTestingModule(),
          CdkTableModule,
          ToastrModule.forRoot(),
          NoopAnimationsModule
        ],
        declarations: [TagListComponent],
        providers: [{ provide: OverlayService, useValue: {} }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
