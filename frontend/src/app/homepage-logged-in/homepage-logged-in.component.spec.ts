import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLoggedInComponent } from './homepage-logged-in.component';

describe('HomepageLoggedInComponent', () => {
  let component: HomepageLoggedInComponent;
  let fixture: ComponentFixture<HomepageLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
