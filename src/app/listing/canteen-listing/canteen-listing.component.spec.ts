import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenListingComponent } from './canteen-listing.component';

describe('CanteenListingComponent', () => {
  let component: CanteenListingComponent;
  let fixture: ComponentFixture<CanteenListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanteenListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanteenListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
