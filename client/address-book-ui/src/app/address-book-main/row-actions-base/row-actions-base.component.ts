import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';

import { AddressRow, EditRow, UserRowAction } from '../../models/address-book';
import { ModalChoice } from '../../models/common';
import { AddressBookService } from '../../services/address-book.service';


@Component({
    selector: 'app-row-actions-base',
    templateUrl: './row-actions-base.component.html',
    styleUrl: './row-actions-base.component.scss',
    standalone: false,
})
export class RowActionsBaseComponent implements OnInit, OnDestroy {
    addressBookService: AddressBookService = inject(AddressBookService);

    readonly data: InputSignal<AddressRow | undefined> = input<AddressRow>();
    protected destroy$: Subject<void> = new Subject<void>();

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

    showDeleteRowConfirmation: boolean = false;
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

    confirmDeleteRow(): void {
    }

    onDeleteChoice(_choice: ModalChoice): void {
    }

    closeModal(): void {
    }

    onCellValueChanged(event: CellValueChangedEvent<EditRow>): void {
        const data = this.data();
        if (data) {
            //  todo: figure out a better way of doing this
            if (event.data.field === 'name') {
                data.name = event.data.value;
            }
            if (event.data.field === 'phone') {
                data.phone = event.data.value;
            }
            if (event.data.field === 'email') {
                data.email = event.data.value;
            }
            if (event.data.field === 'address') {
                data.address = event.data.value;
            }
            if (event.data.field === 'birthday') {
                data.birthday = event.data.value;
            }
            if (event.data.field === 'jobRole') {
                data.jobRole = event.data.value;
            }
            if (event.data.field === 'linkedIn') {
                data.linkedIn = event.data.value;
            }
            if (event.data.field === 'notes') {
                data.notes = event.data.value;
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
