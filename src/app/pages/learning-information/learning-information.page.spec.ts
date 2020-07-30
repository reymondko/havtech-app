import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningInformationPage } from './learning-information.page';

describe('LearningInformationPage', () => {
  let component: LearningInformationPage;
  let fixture: ComponentFixture<LearningInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

