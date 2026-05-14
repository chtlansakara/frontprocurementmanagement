import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFormComponent } from './source-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('SourceFormComponent', () => {
  let component: SourceFormComponent;
  let fixture: ComponentFixture<SourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceFormComponent],
           imports: [TextFieldModule],
      providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
