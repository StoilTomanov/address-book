import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';

import { AddressBookMainComponent } from './address-book-main.component';
import { AddressBookService } from '../services/address-book.service';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';

describe('AddressBookMainComponent', () => {
    let component: AddressBookMainComponent;
    let fixture: ComponentFixture<AddressBookMainComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddressBookMainComponent, CcSimpleInputComponent, CcButtonComponent],
            imports: [AgGridModule],
            providers: [AddressBookService, provideHttpClient(withInterceptorsFromDi())]
        });
        fixture = TestBed.createComponent(AddressBookMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
