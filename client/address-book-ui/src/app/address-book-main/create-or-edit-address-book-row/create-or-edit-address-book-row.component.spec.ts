import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditAddressBookRow } from './create-or-edit-address-book-row.component';
import { AddressBookService } from 'src/app/services/address-book.service';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CcButtonComponent } from 'src/app/shared/cc-button/cc-button.component';

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
