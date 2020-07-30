import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySliderPage } from './gallery-slider.page';

describe('GallerySliderPage', () => {
  let component: GallerySliderPage;
  let fixture: ComponentFixture<GallerySliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerySliderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
