import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SescheduledetailPage } from './sescheduledetail.page';

describe('SescheduledetailPage', () => {
  let component: SescheduledetailPage;
  let fixture: ComponentFixture<SescheduledetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SescheduledetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SescheduledetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
