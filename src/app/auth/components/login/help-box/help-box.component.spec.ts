import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBoxComponent } from './help-box.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HelpBoxComponent', () => {
  let component: HelpBoxComponent;
  let fixture: ComponentFixture<HelpBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpBoxComponent],
      providers:[
         {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue:{}}
      ],
       schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
