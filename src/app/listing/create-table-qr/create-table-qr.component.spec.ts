import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableQrComponent } from './create-table-qr.component';

describe('CreateTableQrComponent', () => {
  let component: CreateTableQrComponent;
  let fixture: ComponentFixture<CreateTableQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTableQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTableQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
