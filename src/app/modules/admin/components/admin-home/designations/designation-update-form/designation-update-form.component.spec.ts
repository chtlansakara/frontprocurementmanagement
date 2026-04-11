import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationUpdateFormComponent } from './designation-update-form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesignationUpdateFormComponent', () => {
  let component: DesignationUpdateFormComponent;
  let fixture: ComponentFixture<DesignationUpdateFormComponent>;
  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationUpdateFormComponent],
          providers: [
          provideHttpClient(),
          {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
