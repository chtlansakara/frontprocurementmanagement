import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivFormComponent } from './subdiv-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivFormComponent', () => {
  let component: SubdivFormComponent;
  let fixture: ComponentFixture<SubdivFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivFormComponent],
        providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
