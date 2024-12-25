import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';

import { AddressRow, EditRow, UserRowAction } from '../../models/address-book';


@Component({
    selector: 'app-row-actions-base',
    templateUrl: './row-actions-base.component.html',
    styleUrl: './row-actions-base.component.scss',
    standalone: false,
})
export class RowActionsBaseComponent implements OnInit, OnDestroy {
    readonly data = input<AddressRow>();

    protected destroy$ = new Subject<void>();

    columnDefs: ColDef[] = [
        {
            headerName: 'Address Row Field',
            field: 'displayableField',
            editable: false,
            flex: 1,
            sortable: false,
        },
        {
            headerName: 'Address Row Value',
            field: 'value',
            editable: true,
            flex: 1,
            sortable: false,
            singleClickEdit: true,
            cellStyle: { cursor: 'pointer' },
            tooltipValueGetter: () => 'Click to start editing',
        },
    ];
    rowData: EditRow[] = [];
    rowAction: UserRowAction | undefined;
    isLoading: boolean = false;

    ngOnInit(): void {
        this.rowData = [
            { displayableField: 'Name', field: 'name', value: this.data()?.name || '' },
            { displayableField: 'Email', field: 'email', value: this.data()?.email || '' },
            { displayableField: 'Phone', field: 'phone', value: this.data()?.phone || '' },
            { displayableField: 'Address', field: 'address', value: this.data()?.address || '' },
            { displayableField: 'Birthday', field: 'birthday', value: this.data()?.birthday || '' },
            { displayableField: 'Job Role', field: 'jobRole', value: this.data()?.jobRole || '' },
            { displayableField: 'LinkedIn', field: 'linkedIn', value: this.data()?.linkedIn || '' },
            { displayableField: 'Notes', field: 'notes', value: this.data()?.notes || '' },
        ];
    }

    onGridReady(_params: GridReadyEvent): void {
    }

    updateRow(): void {
    }

    createRow(): void {
    }

    deleteRow(): void {
    }

    closeModal(): void {
    }

    onCellValueChanged(_event: CellValueChangedEvent<EditRow>): void {
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
