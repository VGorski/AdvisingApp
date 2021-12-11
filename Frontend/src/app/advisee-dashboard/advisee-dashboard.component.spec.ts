import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviseeDashboardComponent } from './advisee-dashboard.component';

describe('AdviseeDashboardComponent', () => {
  let component: AdviseeDashboardComponent;
  let fixture: ComponentFixture<AdviseeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviseeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviseeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
