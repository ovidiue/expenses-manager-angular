import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCardListComponent } from './expense-card-list.component';
import { SharedModule } from '../../modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseCardListComponent', () => {
  let component: ExpenseCardListComponent;
  let fixture: ComponentFixture<ExpenseCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      declarations: [ExpenseCardListComponent]
    })
      .compileComponents();
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
