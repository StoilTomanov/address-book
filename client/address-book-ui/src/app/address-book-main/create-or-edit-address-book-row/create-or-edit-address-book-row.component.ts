import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridReadyEvent, RowValueChangedEvent } from 'ag-grid-community';
import { AddressRow, EditRow as EditAddressRow, EditRow } from 'src/app/models/address-book';

@Component({
    selector: 'app-create-or-edit-address-book-row',
    templateUrl: './create-or-edit-address-book-row.component.html',
    styleUrls: ['./create-or-edit-address-book-row.component.scss'],
})
export class CreateOrEditAddressBookRow implements OnChanges {
    @Input() data: AddressRow | undefined;
    @Output() close: EventEmitter<AddressRow | null> = new EventEmitter<AddressRow | null>();

    isLoading: boolean = false;
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
            tooltipValueGetter: () => 'Click to start editing',
        },
    ];
    rowData: EditAddressRow[] = [];
    editType: 'fullRow' | undefined = 'fullRow';

    ngOnChanges(changes: SimpleChanges): void {
        this.rowData = [
            { displayableField: 'Name', field: 'name', value: this.data?.name || '' },
            { displayableField: 'Email', field: 'email', value: this.data?.email || '' },
            { displayableField: 'Phone', field: 'phone', value: this.data?.phone || '' },
            { displayableField: 'Address', field: 'address', value: this.data?.address || '' },
            { displayableField: 'Birthday', field: 'birthday', value: this.data?.birthday || '' },
            { displayableField: 'Job Role', field: 'jobRole', value: this.data?.jobRole || '' },
            { displayableField: 'LinkedIn', field: 'linkedIn', value: this.data?.linkedIn || '' },
            { displayableField: 'Notes', field: 'notes', value: this.data?.notes || '' },
        ];
    }

    onGridReady(params: GridReadyEvent): void {
        console.log('grid is ready');
    }

    saveRow() {
        this.isLoading = true;
        const shouldCreateRow = this.data?.id === '';
        setTimeout(() => {
            // only for testing
            this.close.emit(this.data);
            this.isLoading = false;
        }, 5000);
        //  todo: get a service to make a post request and emit when response is back
    }

    deleteRow() {
        this.isLoading = true;
        setTimeout(() => {
            // only for testing
            this.close.emit(this.data);
            this.isLoading = false;
        }, 5000);
        //  todo: get a service to make a post request and emit when response is back
    }

    closeModal() {
        this.close.emit(null);
    }

    onCellValueChanged(event: CellValueChangedEvent<EditRow>): void {
        if (this.data) {
            console.log(this.data);

            //  todo: figure out a better way of doing this
            if (event.data.field == 'name') {
                this.data.name = event.data.value;
            }
            if (event.data.field == 'phone') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'email') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'address') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'birthday') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'jobRole') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'linkedIn') {
                this.data.address = event.data.value;
            }
            if (event.data.field == 'notes') {
                this.data.address = event.data.value;
            }
        }
    }
}
