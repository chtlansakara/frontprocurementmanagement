import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementListComponent } from './subdiv-procurement-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivProcurementListComponent', () => {
  let component: SubdivProcurementListComponent;
  let fixture: ComponentFixture<SubdivProcurementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementListComponent],
      providers:[
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
