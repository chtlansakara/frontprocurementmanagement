import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsUpdateComponent } from './subdiv-requests-update.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('SubdivRequestsUpdateComponent', () => {
  let component: SubdivRequestsUpdateComponent;
  let fixture: ComponentFixture<SubdivRequestsUpdateComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsUpdateComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}},

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
