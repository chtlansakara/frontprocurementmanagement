import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsViewComponent } from './subdiv-requests-view.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivRequestsViewComponent', () => {
  let component: SubdivRequestsViewComponent;
  let fixture: ComponentFixture<SubdivRequestsViewComponent>;

   const mockId = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsViewComponent],
      //setup id in the activated route param
       providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
