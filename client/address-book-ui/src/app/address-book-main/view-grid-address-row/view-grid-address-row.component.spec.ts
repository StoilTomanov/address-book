import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGridAddressRowComponent } from './view-grid-address-row.component';

describe('ViewGridAddressRowComponent', () => {
  let component: ViewGridAddressRowComponent;
  let fixture: ComponentFixture<ViewGridAddressRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGridAddressRowComponent]
    });
    fixture = TestBed.createComponent(ViewGridAddressRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
