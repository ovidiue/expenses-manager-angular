import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrimengModule } from '@shared/primeng.module';

import { PageSpinnerComponent } from './page-spinner.component';

describe('PageSpinnerComponent', () => {
  let component: PageSpinnerComponent;
  let fixture: ComponentFixture<PageSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule],
      declarations: [PageSpinnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
