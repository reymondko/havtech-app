import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SESchedulePage } from './seschedule.page';

describe('SESchedulePage', () => {
  let component: SESchedulePage;
  let fixture: ComponentFixture<SESchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SESchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SESchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
