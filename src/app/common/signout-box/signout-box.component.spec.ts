import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutBoxComponent } from './signout-box.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignoutBoxComponent', () => {
  let component: SignoutBoxComponent;
  let fixture: ComponentFixture<SignoutBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignoutBoxComponent],
            providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue:{}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignoutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
