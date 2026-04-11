import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationFormComponent } from './designation-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesignationFormComponent', () => {
  let component: DesignationFormComponent;
  let fixture: ComponentFixture<DesignationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationFormComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
