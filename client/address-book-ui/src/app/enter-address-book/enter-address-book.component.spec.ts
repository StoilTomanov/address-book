import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterAddressBookComponent } from './enter-address-book.component';

describe('EnterAddressBookComponent', () => {
    let component: EnterAddressBookComponent;
    let fixture: ComponentFixture<EnterAddressBookComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EnterAddressBookComponent],
        });
        fixture = TestBed.createComponent(EnterAddressBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
