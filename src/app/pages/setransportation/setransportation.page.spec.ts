import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SETransportationPage } from './setransportation.page';

describe('SETransportationPage', () => {
  let component: SETransportationPage;
  let fixture: ComponentFixture<SETransportationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SETransportationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SETransportationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
