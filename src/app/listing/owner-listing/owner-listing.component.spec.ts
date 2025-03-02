import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerListingComponent } from './owner-listing.component';

describe('OwnerListingComponent', () => {
  let component: OwnerListingComponent;
  let fixture: ComponentFixture<OwnerListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
