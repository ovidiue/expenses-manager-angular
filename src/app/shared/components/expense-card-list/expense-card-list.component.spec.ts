import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseCardListComponent } from './expense-card-list.component';

import { SharedModule } from '@shared/shared.module';

describe('ExpenseCardListComponent', () => {
  let component: ExpenseCardListComponent;
  let fixture: ComponentFixture<ExpenseCardListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, HttpClientTestingModule],
        declarations: [ExpenseCardListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
