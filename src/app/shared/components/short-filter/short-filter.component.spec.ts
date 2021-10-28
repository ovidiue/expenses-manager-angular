import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortFilterComponent } from './short-filter.component';

describe('ShortFilterComponent', () => {
  let component: ShortFilterComponent;
  let fixture: ComponentFixture<ShortFilterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShortFilterComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
