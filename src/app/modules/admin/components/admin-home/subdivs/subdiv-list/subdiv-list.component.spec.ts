import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivListComponent } from './subdiv-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivListComponent', () => {
  let component: SubdivListComponent;
  let fixture: ComponentFixture<SubdivListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivListComponent],
         providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
