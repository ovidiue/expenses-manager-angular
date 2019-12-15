import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDetailAddComponent } from './rate-detail-add.component';

describe('RateDetailComponent', () => {
  let component: RateDetailAddComponent;
  let fixture: ComponentFixture<RateDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [RateDetailAddComponent]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
