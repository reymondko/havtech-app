import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMenusComponent } from './event-menus.component';

describe('EventMenusComponent', () => {
  let component: EventMenusComponent;
  let fixture: ComponentFixture<EventMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMenusComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
