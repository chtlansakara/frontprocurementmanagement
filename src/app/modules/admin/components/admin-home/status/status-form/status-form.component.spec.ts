import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFormComponent } from './status-form.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StatusFormComponent', () => {
  let component: StatusFormComponent;
  let fixture: ComponentFixture<StatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusFormComponent],
        imports: [TextFieldModule],
      providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
