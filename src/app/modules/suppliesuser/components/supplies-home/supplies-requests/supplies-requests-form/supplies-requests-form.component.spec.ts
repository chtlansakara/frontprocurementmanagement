import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsFormComponent } from './supplies-requests-form.component';

describe('SuppliesRequestsFormComponent', () => {
  let component: SuppliesRequestsFormComponent;
  let fixture: ComponentFixture<SuppliesRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
