import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationUpdateFormComponent } from './designation-update-form.component';

describe('DesignationUpdateFormComponent', () => {
  let component: DesignationUpdateFormComponent;
  let fixture: ComponentFixture<DesignationUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignationUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
