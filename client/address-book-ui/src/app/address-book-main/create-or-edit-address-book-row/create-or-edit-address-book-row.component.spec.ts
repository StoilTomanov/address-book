import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditAddressBookRow } from './create-or-edit-address-book-row.component';

describe('CreateOrEditAddressBookRow', () => {
    let component: CreateOrEditAddressBookRow;
    let fixture: ComponentFixture<CreateOrEditAddressBookRow>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateOrEditAddressBookRow],
        });
        fixture = TestBed.createComponent(CreateOrEditAddressBookRow);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
