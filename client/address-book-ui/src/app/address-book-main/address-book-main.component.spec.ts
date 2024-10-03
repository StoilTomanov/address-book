import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AddressBookService } from '../services/address-book.service';
import { AddressBookMainComponent } from './address-book-main.component';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';

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
