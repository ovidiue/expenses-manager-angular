import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoryDetailAddComponent } from './category-detail-add.component';

import { SharedModule } from '@shared/shared.module';

describe('CategoryDetailAddComponent', () => {
  let component: CategoryDetailAddComponent;
  let fixture: ComponentFixture<CategoryDetailAddComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          SharedModule,
          ReactiveFormsModule,
        ],
        declarations: [CategoryDetailAddComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
