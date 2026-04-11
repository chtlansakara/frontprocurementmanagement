import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivUpdateComponent } from './subdiv-update.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivUpdateComponent', () => {
  let component: SubdivUpdateComponent;
  let fixture: ComponentFixture<SubdivUpdateComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivUpdateComponent],
        providers: [
          provideHttpClient(),
          {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
