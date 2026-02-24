import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRejectComponent } from './supplies-reject.component';

describe('SuppliesRejectComponent', () => {
  let component: SuppliesRejectComponent;
  let fixture: ComponentFixture<SuppliesRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRejectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
