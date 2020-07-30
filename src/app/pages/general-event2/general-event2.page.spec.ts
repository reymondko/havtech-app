import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEvent2Page } from './general-event2.page';

describe('GeneralEvent2Page', () => {
  let component: GeneralEvent2Page;
  let fixture: ComponentFixture<GeneralEvent2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEvent2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEvent2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
