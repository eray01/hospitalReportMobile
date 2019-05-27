import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportPage } from './add-report.page';

describe('AddReportPage', () => {
  let component: AddReportPage;
  let fixture: ComponentFixture<AddReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
