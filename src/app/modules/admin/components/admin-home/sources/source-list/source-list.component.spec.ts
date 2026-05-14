import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceListComponent } from './source-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('SourceListComponent', () => {
  let component: SourceListComponent;
  let fixture: ComponentFixture<SourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceListComponent],
         providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
