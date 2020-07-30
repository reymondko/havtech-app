import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEventPage } from './general-event.page';

describe('GeneralEventPage', () => {
  let component: GeneralEventPage;
  let fixture: ComponentFixture<GeneralEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
