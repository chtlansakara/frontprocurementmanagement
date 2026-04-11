import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesApproveComponent } from './supplies-approve.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesApproveComponent', () => {
  let component: SuppliesApproveComponent;
  let fixture: ComponentFixture<SuppliesApproveComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesApproveComponent],
      providers: [
        provideHttpClient(),
        //setup id in the activated route param
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
