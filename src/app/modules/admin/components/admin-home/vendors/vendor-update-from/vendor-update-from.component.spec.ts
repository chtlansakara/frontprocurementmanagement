import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateFromComponent } from './vendor-update-from.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('VendorUpdateFromComponent', () => {
  let component: VendorUpdateFromComponent;
  let fixture: ComponentFixture<VendorUpdateFromComponent>;
  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorUpdateFromComponent],
      providers: [
          provideHttpClient(),
          {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
        ],
      imports: [TextFieldModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorUpdateFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
