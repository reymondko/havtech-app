import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SEMapPage } from './semap.page';

describe('SEMapPage', () => {
  let component: SEMapPage;
  let fixture: ComponentFixture<SEMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SEMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SEMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
