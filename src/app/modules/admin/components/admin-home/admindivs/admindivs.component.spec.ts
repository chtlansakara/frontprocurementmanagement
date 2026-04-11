import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivsComponent } from './admindivs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivsComponent', () => {
  let component: AdmindivsComponent;
  let fixture: ComponentFixture<AdmindivsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
