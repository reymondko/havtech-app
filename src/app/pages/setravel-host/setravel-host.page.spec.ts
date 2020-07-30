import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SETravelHostPage } from './setravel-host.page';

describe('SETravelHostPage', () => {
  let component: SETravelHostPage;
  let fixture: ComponentFixture<SETravelHostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SETravelHostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SETravelHostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
