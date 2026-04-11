import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsComponent } from './designations.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DesignationsComponent', () => {
  let component: DesignationsComponent;
  let fixture: ComponentFixture<DesignationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
