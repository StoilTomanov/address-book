import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { Subject } from 'rxjs';

import { CreateRowComponent } from './create-row.component';
import { AddressRow } from '../../../models/address-book';
import { AddressBookService } from '../../../services/address-book.service';
import { CcButtonComponent } from '../../../shared/cc-button/cc-button.component';

describe('CreateRowComponent', () => {
    let component: CreateRowComponent;
    let fixture: ComponentFixture<CreateRowComponent>;
    let addressBookService: AddressBookService;

    let getAddressBookRecordsSubject: Subject<AddressRow[]>;

    beforeEach(async () => {
        getAddressBookRecordsSubject = new Subject<AddressRow[]>();

        addressBookService = jasmine.createSpyObj({
            getAllAddressBookRecords: getAddressBookRecordsSubject.asObservable(),
        });

        await TestBed.configureTestingModule({
            declarations: [CreateRowComponent, CcButtonComponent],
            imports: [AgGridModule],
            providers: [{
                provide: AddressBookService,
                useValue: addressBookService,
            }],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
