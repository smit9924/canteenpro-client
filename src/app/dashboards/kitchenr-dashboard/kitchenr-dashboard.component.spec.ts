import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenrDashboardComponent } from './kitchenr-dashboard.component';

describe('KitchenrDashboardComponent', () => {
  let component: KitchenrDashboardComponent;
  let fixture: ComponentFixture<KitchenrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenrDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
