import { Component, inject, OnDestroy } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { finalize, Subject, takeUntil } from 'rxjs';

import { AddressRow, AddressRowChangeEvent } from '../models/address-book';
import { AddressBookService } from '../services/address-book.service';

@Component({
    selector: 'app-address-book-main',
    templateUrl: './address-book-main.component.html',
    styleUrls: ['./address-book-main.component.scss'],
    standalone: false,
})
export class AddressBookMainComponent implements OnDestroy {
    private destroy$ = new Subject<void>();
    addressBookService: AddressBookService = inject(AddressBookService);

    gridApi: GridApi | undefined;
    searchValue: string = '';
    showUpdateRowView: boolean = false;
    showCreateRowView: boolean = false;
    isLoading: boolean = false;
    selectedRow: AddressRow | undefined;
    rows: AddressRow[] = [];
    colDefs: ColDef<AddressRow>[] = [
        { headerName: 'Name', field: 'name', flex: 1, cellStyle: { cursor: 'pointer' }, sort: 'asc' },
        { headerName: 'Phone', field: 'phone', flex: 1, cellStyle: { cursor: 'pointer' } },
        { headerName: 'Email', field: 'email', flex: 1, cellStyle: { cursor: 'pointer' } },
    ];

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

    onSearchTextBoxChanged(searchValue: string): void {
        this.searchValue = searchValue;
        this.gridApi?.setGridOption('quickFilterText', searchValue);
    }

    onClearSearchInputClicked(): void {
        this.searchValue = '';
        this.onSearchTextBoxChanged(this.searchValue);
    }

    onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;

        this.isLoading = true;
        this.addressBookService
            .getAllAddressBookRecords()
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false))
            )
            .subscribe((addressBookRows) => {
                this.rows = addressBookRows;
            });
    }

    onRowClicked(row: RowClickedEvent<AddressRow>): void {
        this.selectedRow = row.data;
        this.showUpdateRowView = true;
    }

    onAddRowClicked(): void {
        this.showCreateRowView = true;
        this.selectedRow = this.emptyAddressRow;
    }

    onModalClosed(addressRowChangeEvent: AddressRowChangeEvent): void {
        this.showUpdateRowView = false;
        this.showCreateRowView = false;
        if (!addressRowChangeEvent.row) {
            return;
        }
        switch (addressRowChangeEvent.action) {
            case 'create':
                this.rows = this.rows.concat([addressRowChangeEvent.row]);
                break;
            case 'update':
                this.rows = this.rows.map((row) => {
                    return row._id === addressRowChangeEvent.row?._id ? addressRowChangeEvent.row : row;
                });
                break;
            case 'delete':
                this.rows = this.rows.filter((row) => row._id !== addressRowChangeEvent.row?._id);
                break;
            default:
                break;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
