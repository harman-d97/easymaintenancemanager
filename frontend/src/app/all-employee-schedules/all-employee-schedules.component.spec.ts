import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeSchedulesComponent } from './all-employee-schedules.component';

describe('AllEmployeeSchedulesComponent', () => {
  let component: AllEmployeeSchedulesComponent;
  let fixture: ComponentFixture<AllEmployeeSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmployeeSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmployeeSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
