import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesReportsComponent } from './supplies-reports.component';

describe('SuppliesReportsComponent', () => {
  let component: SuppliesReportsComponent;
  let fixture: ComponentFixture<SuppliesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
