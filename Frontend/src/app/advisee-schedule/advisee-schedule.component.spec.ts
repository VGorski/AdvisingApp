import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviseeScheduleComponent } from './advisee-schedule.component';

describe('AdviseeScheduleComponent', () => {
  let component: AdviseeScheduleComponent;
  let fixture: ComponentFixture<AdviseeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviseeScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviseeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
