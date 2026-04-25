import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateFromComponent } from './vendor-update-from.component';

describe('VendorUpdateFromComponent', () => {
  let component: VendorUpdateFromComponent;
  let fixture: ComponentFixture<VendorUpdateFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorUpdateFromComponent]
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
