import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesDashboardComponent } from './supplies-dashboard.component';

describe('SuppliesDashboardComponent', () => {
  let component: SuppliesDashboardComponent;
  let fixture: ComponentFixture<SuppliesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
