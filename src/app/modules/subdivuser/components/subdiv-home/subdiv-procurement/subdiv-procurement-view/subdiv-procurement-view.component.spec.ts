import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementViewComponent } from './subdiv-procurement-view.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivProcurementViewComponent', () => {
  let component: SubdivProcurementViewComponent;
  let fixture: ComponentFixture<SubdivProcurementViewComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementViewComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
