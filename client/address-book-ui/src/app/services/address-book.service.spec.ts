import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AddressBookService } from './address-book.service';
import { AddressRow } from '../models/address-book';
import { getDefaultAddressBookRecords } from '../testing/utils';

describe('AddressBookService', () => {
    let service: AddressBookService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AddressBookService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('When getting all the records', () => {
        const mockRecords: AddressRow[] = getDefaultAddressBookRecords();

        it('it should make the right call and returns the correct data', () => {
            service.getAllAddressBookRecords().subscribe((received) => {
                expect(received).toEqual([
                    {
                        _id: '123',
                        name: 'Mike',
                        email: 'mike@email.com',
                        phone: '+123 456 789',
                        expanded: false,
                    },
                    {
                        _id: '456',
                        name: 'Anne',
                        email: 'anne@email.com',
                        phone: '+987 654 321',
                        expanded: false,
                    },
                ]);
            });

            const req = httpTestingController.expectOne('http://localhost:3000/address-book');
            expect(req.request.method).toBe('GET');
            req.flush(mockRecords);
        });
    });

    describe('When updating a record', () => {
        const updatedRecord: AddressRow = getDefaultAddressBookRecords()[1];
        const recordId = '456';

        it('should update an existing address book record', () => {
            service.updateAddressBookRecord(updatedRecord, recordId).subscribe((record) => {
                expect(record).toEqual(updatedRecord);
            });

            const req = httpTestingController.expectOne(`http://localhost:3000/address-book/update/${recordId}`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual({
                name: 'Anne',
                email: 'anne@email.com',
                phone: '+987 654 321',
                address: undefined,
                jobRole: undefined,
                linkedIn: undefined,
                birthday: undefined,
                notes: undefined,
            });
            req.flush(updatedRecord);
        });
    });

    describe('When deleting a record', () => {
        const newRecord: AddressRow = {
            _id: '241',
            name: 'Jane Doe',
            email: 'jane@example.com',
            phone: '+235 425 325',
            expanded: false,
            address: '456 Avenue',
            jobRole: 'Designer',
            linkedIn: 'linkedin.com/janedoe',
            birthday: '1992-02-02',
            notes: '',
        };

        it('should create a new address book record', () => {
            service.createAddressBookRecord(newRecord).subscribe((record) => {
                expect(record).toEqual({
                    _id: '241',
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    phone: '+235 425 325',
                    expanded: false,
                    address: '456 Avenue',
                    jobRole: 'Designer',
                    linkedIn: 'linkedin.com/janedoe',
                    birthday: '1992-02-02',
                    notes: '',
                });
            });

            const req = httpTestingController.expectOne('http://localhost:3000/address-book/create');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                name: 'Jane Doe',
                email: 'jane@example.com',
                phone: '+235 425 325',
                address: '456 Avenue',
                jobRole: 'Designer',
                linkedIn: 'linkedin.com/janedoe',
                birthday: '1992-02-02',
                notes: '',
            });
            req.flush(newRecord);
        });
    });

    describe('When deleting a record', () => {
        const rowId: string = '123';
        const deletedRecord: AddressRow = getDefaultAddressBookRecords()[0];

        it('it should make the right call and returns the correct data', () => {
            service.deleteAddressBookRecord(rowId).subscribe((record) => {
                expect(record).toEqual(deletedRecord);
            });

            const req = httpTestingController.expectOne(`http://localhost:3000/address-book/delete/${rowId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(deletedRecord);
        });
    });

    afterAll(() => {
        httpTestingController.verify(); // Optional: Ensure no outstanding requests after all tests
    });
});
