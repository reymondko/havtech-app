import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTabsComponent } from './event-tabs.component';

describe('EventTabsComponent', () => {
  let component: EventTabsComponent;
  let fixture: ComponentFixture<EventTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTabsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
