/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddConceptComponent } from './add-concept.component';

describe('AddConceptComponent', () => {
  let component: AddConceptComponent;
  let fixture: ComponentFixture<AddConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});