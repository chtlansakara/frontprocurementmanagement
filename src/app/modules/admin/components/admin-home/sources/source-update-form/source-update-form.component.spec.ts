import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUpdateFormComponent } from './source-update-form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('SourceUpdateFormComponent', () => {
  let component: SourceUpdateFormComponent;
  let fixture: ComponentFixture<SourceUpdateFormComponent>;
   const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceUpdateFormComponent],
            providers: [
          provideHttpClient(),
          {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
        ],
      imports: [TextFieldModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
