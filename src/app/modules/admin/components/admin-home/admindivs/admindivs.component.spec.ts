import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivsComponent } from './admindivs.component';

describe('AdmindivsComponent', () => {
  let component: AdmindivsComponent;
  let fixture: ComponentFixture<AdmindivsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
