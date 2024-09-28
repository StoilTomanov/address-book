import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookMainComponent } from './address-book-main.component';

describe('AddressBookMainComponent', () => {
  let component: AddressBookMainComponent;
  let fixture: ComponentFixture<AddressBookMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressBookMainComponent]
    });
    fixture = TestBed.createComponent(AddressBookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
