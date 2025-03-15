import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsListingComponent } from './food-items-listing.component';

describe('FoodItemsComponent', () => {
  let component: FoodItemsListingComponent;
  let fixture: ComponentFixture<FoodItemsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemsListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodItemsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
