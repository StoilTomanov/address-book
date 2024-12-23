import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';

import { AddressBookMainComponent } from './address-book-main.component';
import { AddressBookService } from '../services/address-book.service';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';

describe('AddressBookMainComponent', () => {
    let component: AddressBookMainComponent;
    let fixture: ComponentFixture<AddressBookMainComponent>;

    let gridApiMock: GridApi;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddressBookMainComponent, CcSimpleInputComponent, CcButtonComponent],
            imports: [AgGridModule],
            providers: [AddressBookService, provideHttpClient(withInterceptorsFromDi())]
        });
        fixture = TestBed.createComponent(AddressBookMainComponent);
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
});
