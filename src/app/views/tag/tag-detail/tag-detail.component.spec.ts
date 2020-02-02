import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailAddComponent } from './tag-detail-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../modules/shared.module';

describe('TagDetailComponent', () => {
  let component: TagDetailAddComponent;
  let fixture: ComponentFixture<TagDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [TagDetailAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
