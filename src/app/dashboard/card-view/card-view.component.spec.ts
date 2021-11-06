import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';

describe('CardViewComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CardViewComponent, TestHostComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

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
      <app-card-view [data]="testData"></app-card-view>
    `,
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
      noOfExpenses: 7,
    };
  }
});
