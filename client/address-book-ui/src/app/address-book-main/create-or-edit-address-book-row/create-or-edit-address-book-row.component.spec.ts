import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
/* eslint-disable-next-line import/order */
import { AgGridModule } from 'ag-grid-angular';

import { AddressBookService } from 'src/app/services/address-book.service';
/* eslint-disable-next-line import/order */
import { CcButtonComponent } from 'src/app/shared/cc-button/cc-button.component';
import { CreateOrEditAddressBookRow } from './create-or-edit-address-book-row.component';

describe('CreateOrEditAddressBookRow', () => {
    let component: CreateOrEditAddressBookRow;
    let fixture: ComponentFixture<CreateOrEditAddressBookRow>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AgGridModule],
            declarations: [CreateOrEditAddressBookRow, CcButtonComponent],
            providers: [AddressBookService],
        });
        fixture = TestBed.createComponent(CreateOrEditAddressBookRow);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
