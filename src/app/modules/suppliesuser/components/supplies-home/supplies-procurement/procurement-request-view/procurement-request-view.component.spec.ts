import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementRequestViewComponent } from './procurement-request-view.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ProcurementRequestViewComponent', () => {
  let component: ProcurementRequestViewComponent;
  let fixture: ComponentFixture<ProcurementRequestViewComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcurementRequestViewComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: mockId}}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
