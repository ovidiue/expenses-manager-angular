import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRatesComponent } from './dialog-rates.component';

describe('DialogRatesComponent', () => {
  let component: DialogRatesComponent;
  let fixture: ComponentFixture<DialogRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
