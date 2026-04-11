import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsComponent } from './subdiv-requests.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivRequestsComponent', () => {
  let component: SubdivRequestsComponent;
  let fixture: ComponentFixture<SubdivRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
