import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsComponent } from './supplies-requests.component';

describe('SuppliesRequestsComponent', () => {
  let component: SuppliesRequestsComponent;
  let fixture: ComponentFixture<SuppliesRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
