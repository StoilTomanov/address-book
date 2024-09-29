import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AddressRow } from '../models/address-book';

@Component({
    selector: 'app-address-book-main',
    templateUrl: './address-book-main.component.html',
    styleUrls: ['./address-book-main.component.scss'],
})
export class AddressBookMainComponent {
    gridApi: GridApi | undefined;
    searchValue: string = '';
    rows: AddressRow[] = [
        { id: 123, name: 'John', phone: '+359 885 745 458', email: 'john.doe@email.com', expanded: false },
        { id: 456, name: 'Sara', phone: '+359 456 123 753', email: 'sara.doe@email.com', expanded: true },
        { id: 623, name: 'Mike', phone: '+359 456 123 435', email: 'mike.doe@email.com', expanded: true },
        { id: 621, name: 'Anne', phone: '+359 456 123 123', email: 'anne.doe@email.com', expanded: true },
        { id: 362, name: 'Eliza', phone: '+359 456 123 624', email: 'eliza.doe@email.com', expanded: true },
    ];
    colDefs: ColDef<AddressRow>[] = [
        { headerName: 'Name', field: 'name', flex: 1 },
        { headerName: 'Phone', field: 'phone', flex: 1 },
        { headerName: 'Email', field: 'email', flex: 1 },
    ];

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
    }
}
