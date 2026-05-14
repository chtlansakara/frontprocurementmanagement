import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileFormComponent } from './add-file-form.component';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddFileFormComponent', () => {
  let component: AddFileFormComponent;
  let fixture: ComponentFixture<AddFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFileFormComponent],
      providers: [
        provideHttpClient(),
            {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue:{}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
