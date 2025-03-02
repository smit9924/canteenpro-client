import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListingComponent } from './manager-listing.component';

describe('ManagerListingComponent', () => {
  let component: ManagerListingComponent;
  let fixture: ComponentFixture<ManagerListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
