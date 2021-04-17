import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoriesListComponent } from './categories-list.component';

import { SharedModule } from '@shared/shared.module';

describe('CategoriesComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, HttpClientTestingModule],
        declarations: [CategoriesListComponent],
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
