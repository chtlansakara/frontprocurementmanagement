import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivListComponent } from './admindiv-list.component';

describe('AdmindivListComponent', () => {
  let component: AdmindivListComponent;
  let fixture: ComponentFixture<AdmindivListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
