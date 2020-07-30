import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventPage } from './special-event.page';

describe('SpecialEventPage', () => {
  let component: SpecialEventPage;
  let fixture: ComponentFixture<SpecialEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
