import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSpinnerComponent } from './page-spinner.component';

import { LottieModule } from 'ngx-lottie';

describe('PageSpinnerComponent', () => {
  let component: PageSpinnerComponent;
  let fixture: ComponentFixture<PageSpinnerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LottieModule],
        declarations: [PageSpinnerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
