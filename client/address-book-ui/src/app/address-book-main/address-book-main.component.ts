import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { AddressRow, AddressRowChangeEvent } from '../models/address-book';
import { AddressBookService } from '../services/address-book.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-address-book-main',
    templateUrl: './address-book-main.component.html',
    styleUrls: ['./address-book-main.component.scss'],
})
export class AddressBookMainComponent {
    gridApi: GridApi | undefined;
    searchValue: string = '';
    showRowDetails: boolean = false;
    isLoading: boolean = false;
    selectedRow: AddressRow | undefined;
    rows: AddressRow[] = [];
    colDefs: ColDef<AddressRow>[] = [
        { headerName: 'Name', field: 'name', flex: 1, cellStyle: { cursor: 'pointer' } },
        { headerName: 'Phone', field: 'phone', flex: 1, cellStyle: { cursor: 'pointer' } },
        { headerName: 'Email', field: 'email', flex: 1, cellStyle: { cursor: 'pointer' } },
    ];

    constructor(private addressBookService: AddressBookService) {}

    private get emptyAddressRow(): AddressRow {
        return {
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
        };
    }

    onSearchTextBoxChanged(searchValue: string) {
        this.searchValue = searchValue;
        this.gridApi?.setGridOption('quickFilterText', searchValue);
    }

    onClearSearchInputClicked(): void {
        this.searchValue = '';
        this.onSearchTextBoxChanged(this.searchValue);
    }

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.isLoading = true;
        this.addressBookService
            .getAllAddressBookRecords()
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((addressBookRows) => {
                this.rows = addressBookRows;
            });
    }

    onRowClicked(row: RowClickedEvent<AddressRow, any>): void {
        this.selectedRow = row.data;
        this.showRowDetails = true;
    }

    onAddRowClicked(): void {
        this.showRowDetails = true;
        this.selectedRow = this.emptyAddressRow;
    }

    onModalClosed(addressRowChangeEvent: AddressRowChangeEvent): void {
        if (addressRowChangeEvent.action === 'delete') {
            this.rows = this.rows.filter((row) => row._id != addressRowChangeEvent.row?._id);
        }
        this.showRowDetails = false;
    }
}
