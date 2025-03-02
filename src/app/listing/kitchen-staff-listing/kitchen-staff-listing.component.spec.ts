import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStaffListingComponent } from './kitchen-staff-listing.component';

describe('KitchenStaffListingComponent', () => {
  let component: KitchenStaffListingComponent;
  let fixture: ComponentFixture<KitchenStaffListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenStaffListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenStaffListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
