import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';

import { AddressBookMainComponent } from './address-book-main.component';
import { AddressRow } from '../models/address-book';
import { AddressBookService } from '../services/address-book.service';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';
import { getDefaultAddressBookRecords } from '../testing/utils';
import {
    CreateOrEditAddressBookRow,
} from './create-or-edit-address-book-row/create-or-edit-address-book-row.component';

describe('AddressBookMainComponent', () => {
    let component: AddressBookMainComponent;
    let fixture: ComponentFixture<AddressBookMainComponent>;
    let element: DebugElement;
    let addressBookService: AddressBookService;

    let getAddressBookRecordsSubject: Subject<AddressRow[]>;

    let gridApiMock: GridApi;

    beforeEach(() => {
        getAddressBookRecordsSubject = new Subject<AddressRow[]>();

        addressBookService = jasmine.createSpyObj({
            getAllAddressBookRecords: getAddressBookRecordsSubject.asObservable(),
        });

        TestBed.configureTestingModule({
            declarations: [
                AddressBookMainComponent,
                CreateOrEditAddressBookRow,
                CcSimpleInputComponent,
                CcButtonComponent,
            ],
            imports: [AgGridModule],
            providers: [
                {
                    provide: AddressBookService,
                    useValue: addressBookService,
                },
                provideHttpClient(withInterceptorsFromDi()),
            ],
        });
        fixture = TestBed.createComponent(AddressBookMainComponent);
        element = fixture.debugElement;
        component = fixture.componentInstance;
        gridApiMock = jasmine.createSpyObj('GridApi', ['setGridOption']);
        component.gridApi = gridApiMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('When search text box value change', () => {
        beforeEach(() => {
            component.onSearchTextBoxChanged('test');
        });

        it('it updates the searchValue property', () => {
            expect(component.searchValue).toEqual('test');
        });

        it('it calls setGridOption from the grid api', () => {
            expect(gridApiMock.setGridOption).toHaveBeenCalledOnceWith('quickFilterText', 'test');
        });
    });

    describe('When search text box value gets cleared', () => {
        beforeEach(() => {
            spyOn(component, 'onSearchTextBoxChanged').and.callThrough();
            component.searchValue = 'test again';
            component.onClearSearchInputClicked();
        });

        it('it updates the searchValue property', () => {
            expect(component.searchValue).toEqual('');
        });

        it('it calls onSearchTextBoxChanged', () => {
            expect(component.onSearchTextBoxChanged).toHaveBeenCalledWith('');
        });

        it('it calls setGridOption from the grid api', () => {
            expect(gridApiMock.setGridOption).toHaveBeenCalledOnceWith('quickFilterText', '');
        });
    });

    describe('When grid is ready', () => {
        beforeEach(() => {
            const gridReadyEvent: GridReadyEvent = {
                api: gridApiMock,
            } as GridReadyEvent;
            component.onGridReady(gridReadyEvent);
        });

        it('it sets the gridApi', () => {
            expect(component.gridApi).toEqual(gridApiMock);
        });

        it('it sets the isLoading flag to true', () => {
            expect(component.isLoading).toEqual(true);
        });

        it('it calls getAllAddressBookRecords', () => {
            expect(addressBookService.getAllAddressBookRecords).toHaveBeenCalled();
            expect(addressBookService.getAllAddressBookRecords).toHaveBeenCalledTimes(1);
        });

        describe('and service returns a response', () => {
            beforeEach(() => {
                getAddressBookRecordsSubject.next(getDefaultAddressBookRecords());
            });

            it('it sets the rows', () => {
                expect(component.rows).toEqual([
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

            it('it sets the isLoading flag to false when jubject completes', () => {
                getAddressBookRecordsSubject.complete();
                expect(component.isLoading).toEqual(false);
            });
        });
    });

    describe('When row is clicked', () => {
        let createOrEditAddressBookRowComponent: DebugElement;

        beforeEach(() => {
            const rowClickEvent: RowClickedEvent = { data: getDefaultAddressBookRecords()[0] } as RowClickedEvent;

            component.onRowClicked(rowClickEvent);
            fixture.detectChanges();

            createOrEditAddressBookRowComponent = element.query(By.directive(CreateOrEditAddressBookRow));
        });

        it('it sets the selected row', () => {
            expect(component.selectedRow).toEqual({
                _id: '123',
                name: 'Mike',
                email: 'mike@email.com',
                phone: '+123 456 789',
                expanded: false,
            });
        });

        it('it shows the details for the row', () => {
            expect(component.showRowDetails).toEqual(true);
        });

        it('it shows the create or edit address book row component ', () => {
            expect(createOrEditAddressBookRowComponent).not.toBeNull();
        });
    });

    describe('When Add Row is clicked', () => {
        let createOrEditAddressBookRowComponent: DebugElement;

        beforeEach(() => {
            component.onAddRowClicked();
            fixture.detectChanges();

            createOrEditAddressBookRowComponent = element.query(By.directive(CreateOrEditAddressBookRow));
        });

        it('it shows the details for the row', () => {
            expect(component.showRowDetails).toEqual(true);
        });

        it('it sets the selected row', () => {
            expect(component.selectedRow).toEqual({
                _id: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                birthday: '',
                jobRole: '',
                linkedIn: '',
                notes: '',
                expanded: false,
            });
        });

        it('it shows the create or edit address book row component ', () => {
            expect(createOrEditAddressBookRowComponent).not.toBeNull();
        });
    });

    describe('When create or edit component is closed', () => {
        let createOrEditAddressBookRowComponent: DebugElement;

        beforeEach(() => {
            const rowClickEvent: RowClickedEvent = { data: getDefaultAddressBookRecords()[0] } as RowClickedEvent;
            component.onRowClicked(rowClickEvent);
            fixture.detectChanges();

            component.rows = getDefaultAddressBookRecords();
            expect(component.rows).toEqual([
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

        describe('and there is no row', () => {
            beforeEach(() => {
                component.onModalClosed({
                    row: null,
                    action: 'delete',
                });
                fixture.detectChanges();
            });

            it('it does nothing', () => {
                expect(component.rows).toEqual([
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
        });

        describe('and the action is delete', () => {
            beforeEach(() => {
                component.onModalClosed({
                    row: getDefaultAddressBookRecords()[0],
                    action: 'delete',
                });
                fixture.detectChanges();
            });

            it('it updates the rows', () => {
                expect(component.rows).toEqual([{
                    _id: '456',
                    name: 'Anne',
                    email: 'anne@email.com',
                    phone: '+987 654 321',
                    expanded: false,
                }]);
            });

            it('it sets the showRowDetails to false', () => {
                expect(component.showRowDetails).toEqual(false);
            });

            it('it closes the create or edit address book row component', () => {
                createOrEditAddressBookRowComponent = element.query(By.directive(CreateOrEditAddressBookRow));
                expect(createOrEditAddressBookRowComponent).toBeNull();
            });
        });

        describe('and the action is create', () => {
            let newRow: AddressRow;

            beforeEach(() => {
                newRow = {
                    _id: '678',
                    name: 'Lilly',
                    email: 'lilly@email.com',
                    phone: '+233 904 364',
                    expanded: false,
                };
                component.onModalClosed({
                    row: newRow,
                    action: 'create',
                });
                fixture.detectChanges();
            });

            it('it updates the rows', () => {
                expect(component.rows).toEqual([...getDefaultAddressBookRecords(), newRow]);
            });

            it('it sets the showRowDetails to false', () => {
                expect(component.showRowDetails).toEqual(false);
            });

            it('it closes the create or edit address book row component', () => {
                createOrEditAddressBookRowComponent = element.query(By.directive(CreateOrEditAddressBookRow));
                expect(createOrEditAddressBookRowComponent).toBeNull();
            });
        });

        describe('and the action is update', () => {
            let updatedRow: AddressRow;

            beforeEach(() => {
                updatedRow = {
                    ...getDefaultAddressBookRecords()[1],
                    address: 'some other address',
                    email: 'changed@email.com',
                };
                component.onModalClosed({
                    row: updatedRow,
                    action: 'update',
                });
                fixture.detectChanges();
            });

            it('it updates the rows', () => {
                expect(component.rows).toEqual([
                    {
                        _id: '123',
                        name: 'Mike',
                        email: 'mike@email.com',
                        phone: '+123 456 789',
                        expanded: false,
                    },
                    {
                        _id: '456',
                        address: 'some other address',
                        name: 'Anne',
                        email: 'changed@email.com',
                        phone: '+987 654 321',
                        expanded: false,
                    },
                ]);
            });

            it('it sets the showRowDetails to false', () => {
                expect(component.showRowDetails).toEqual(false);
            });

            it('it closes the create or edit address book row component', () => {
                createOrEditAddressBookRowComponent = element.query(By.directive(CreateOrEditAddressBookRow));
                expect(createOrEditAddressBookRowComponent).toBeNull();
            });
        });

        describe('and action is none', () => {
            beforeEach(() => {
                component.onModalClosed({
                    row: getDefaultAddressBookRecords()[0],
                    action: 'none',
                });
                fixture.detectChanges();
            });

            it('it does nothing', () => {
                expect(component.rows).toEqual([
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
        });
    });
});
