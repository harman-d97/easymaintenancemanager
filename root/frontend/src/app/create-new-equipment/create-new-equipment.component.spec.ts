import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewEquipmentComponent } from './create-new-equipment.component';

describe('CreateNewEquipmentComponent', () => {
  let component: CreateNewEquipmentComponent;
  let fixture: ComponentFixture<CreateNewEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
