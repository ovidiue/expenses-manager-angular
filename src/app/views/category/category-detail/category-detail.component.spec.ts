import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../../modules/shared.module';

import { CategoryDetailAddComponent } from './category-detail-add.component';

describe('CategoryDetailAddComponent', () => {
  let component: CategoryDetailAddComponent;
  let fixture: ComponentFixture<CategoryDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule, ReactiveFormsModule],
      declarations: [CategoryDetailAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
