import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNowEventPage } from './right-now-event.page';

describe('RightNowEventPage', () => {
  let component: RightNowEventPage;
  let fixture: ComponentFixture<RightNowEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightNowEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNowEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
