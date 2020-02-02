import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';
import { SharedModule } from '../../modules/shared.module';
import { Component } from '@angular/core';

describe('CardViewComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CardViewComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    selector: 'app-host-component',
    template: `
      <app-card-view [data]="testData"></app-card-view>`
  })
  class TestHostComponent {
    testData = {
      name: 'test',
      color: 'RED',
      payed: 2,
      total: 4,
      min: 1,
      max: 5,
      totalRecurrent: 6,
      nonRecurrent: 5,
      closed: 5,
      noOfExpenses: 7
    };
  }
});
