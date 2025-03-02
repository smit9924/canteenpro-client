import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQrCodeListingComponent } from './table-qr-code-listing.component';

describe('TableQrCodeListingComponent', () => {
  let component: TableQrCodeListingComponent;
  let fixture: ComponentFixture<TableQrCodeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableQrCodeListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableQrCodeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
