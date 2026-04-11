import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsUpdateComponent } from './supplies-requests-update.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('SuppliesRequestsUpdateComponent', () => {
  let component: SuppliesRequestsUpdateComponent;
  let fixture: ComponentFixture<SuppliesRequestsUpdateComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsUpdateComponent],
       providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
