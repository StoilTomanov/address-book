import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { Subject } from 'rxjs';

import { UpdateRowComponent } from './update-row.component';
import { AddressRow } from '../../../models/address-book';
import { AddressBookService } from '../../../services/address-book.service';
import { CcButtonComponent } from '../../../shared/cc-button/cc-button.component';

describe('UpdateRowComponent', () => {
    let component: UpdateRowComponent;
    let fixture: ComponentFixture<UpdateRowComponent>;
    let addressBookService: AddressBookService;

    let getAddressBookRecordsSubject: Subject<AddressRow[]>;

    beforeEach(async () => {
        getAddressBookRecordsSubject = new Subject<AddressRow[]>();

        addressBookService = jasmine.createSpyObj({
            getAllAddressBookRecords: getAddressBookRecordsSubject.asObservable(),
        });

        await TestBed.configureTestingModule({
            declarations: [UpdateRowComponent, CcButtonComponent],
            imports: [AgGridModule],
            providers: [{
                provide: AddressBookService,
                useValue: addressBookService,
            }],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
