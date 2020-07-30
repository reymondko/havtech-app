import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordpromptPage } from './passwordprompt.page';

describe('PasswordpromptPage', () => {
  let component: PasswordpromptPage;
  let fixture: ComponentFixture<PasswordpromptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordpromptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordpromptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
