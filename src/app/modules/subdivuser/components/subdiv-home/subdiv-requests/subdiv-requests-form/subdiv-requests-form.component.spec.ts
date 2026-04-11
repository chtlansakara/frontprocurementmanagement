import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsFormComponent } from './subdiv-requests-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivRequestsFormComponent', () => {
  let component: SubdivRequestsFormComponent;
  let fixture: ComponentFixture<SubdivRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsFormComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
