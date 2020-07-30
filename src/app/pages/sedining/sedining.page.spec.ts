import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SEDiningPage } from './sedining.page';

describe('SEDiningPage', () => {
  let component: SEDiningPage;
  let fixture: ComponentFixture<SEDiningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SEDiningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SEDiningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
