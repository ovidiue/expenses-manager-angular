import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';

import { ExpenseCardListComponent } from './expense-card-list.component';

describe('ExpenseCardListComponent', () => {
  let component: ExpenseCardListComponent;
  let fixture: ComponentFixture<ExpenseCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ExpenseCardListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
