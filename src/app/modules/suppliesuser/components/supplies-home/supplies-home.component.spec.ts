import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesHomeComponent } from './supplies-home.component';

describe('SuppliesHomeComponent', () => {
  let component: SuppliesHomeComponent;
  let fixture: ComponentFixture<SuppliesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
