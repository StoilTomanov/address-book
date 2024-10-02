import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookMainComponent } from './address-book-main.component';
import { AddressBookService } from '../services/address-book.service';
import { HttpClientModule } from '@angular/common/http';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';
import { AgGridModule } from 'ag-grid-angular';

describe('AddressBookMainComponent', () => {
    let component: AddressBookMainComponent;
    let fixture: ComponentFixture<AddressBookMainComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, AgGridModule],
            declarations: [AddressBookMainComponent, CcSimpleInputComponent, CcButtonComponent],
            providers: [AddressBookService],
        });
        fixture = TestBed.createComponent(AddressBookMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
