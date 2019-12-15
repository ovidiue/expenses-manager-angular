import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailAddComponent } from './expense-detail-add.component';

describe('ExpenseDetailComponent', () => {
  let component: ExpenseDetailAddComponent;
  let fixture: ComponentFixture<ExpenseDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ExpenseDetailAddComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
