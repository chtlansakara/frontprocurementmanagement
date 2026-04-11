import { provideHttpClient } from '@angular/common/http';
import { admindivListComponent } from './admindiv-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivListComponent', () => {
  let component: admindivListComponent;
  let fixture: ComponentFixture<admindivListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [admindivListComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(admindivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
