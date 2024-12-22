import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { finalize } from 'rxjs';
import { AddressRow, AddressRowChangeEvent, EditRow } from 'src/app/models/address-book';
import { AddressBookService } from 'src/app/services/address-book.service';

@Component({
    selector: 'app-create-or-edit-address-book-row',
    templateUrl: './create-or-edit-address-book-row.component.html',
    styleUrls: ['./create-or-edit-address-book-row.component.scss'],
    standalone: false,
})
export class CreateOrEditAddressBookRow implements OnChanges {
    @Input() data: AddressRow | undefined;
    @Output() close: EventEmitter<AddressRowChangeEvent> = new EventEmitter<AddressRowChangeEvent>();

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
            cellStyle: { cursor: 'pointer' },
            tooltipValueGetter: () => 'Click to start editing',
        },
    ];
    rowData: EditRow[] = [];
    editType: 'fullRow' | undefined = 'fullRow';
    rowAction: 'Add Row' | 'Edit Row' | undefined;

    constructor(private addressBookService: AddressBookService) {}

    ngOnChanges(_changes: SimpleChanges): void {
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

    onGridReady(_params: GridReadyEvent): void {
        this.rowAction = this.data?._id ? 'Edit Row' : 'Add Row';
    }

    saveRow(): void {
        if (this.data) {
            this.isLoading = true;
            const dataRowId = this.data._id;
            const shouldCreateRow = dataRowId === '';
            if (shouldCreateRow) {
                this.createAddressBookRecord(this.data);
            } else {
                this.updateAddressBookRecord(this.data, dataRowId);
            }
        }
    }

    private createAddressBookRecord(rowData: AddressRow): void {
        this.addressBookService
            .createAddressBookRecord(rowData)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((createdRecord) => {
                this.close.emit({ row: createdRecord, action: 'create' });
            });
    }

    private updateAddressBookRecord(rowData: AddressRow, dataRowId: string): void {
        this.addressBookService
            .updateAddressBookRecord(rowData, dataRowId)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((updatedRecord) => {
                this.close.emit({ row: updatedRecord, action: 'update' });
            });
    }

    deleteRow(): void {
        this.isLoading = true;
        if (this.data) {
            this.addressBookService
                .deleteAddressBookRecord(this.data._id)
                .pipe(finalize(() => (this.isLoading = false)))
                .subscribe((deletedRecord) => {
                    this.close.emit({ row: deletedRecord, action: 'delete' });
                });
        }
    }

    closeModal(): void {
        this.close.emit({ row: null, action: 'none' });
    }

    onCellValueChanged(event: CellValueChangedEvent<EditRow>): void {
        if (this.data) {
            //  todo: figure out a better way of doing this
            if (event.data.field === 'name') {
                this.data.name = event.data.value;
            }
            if (event.data.field === 'phone') {
                this.data.phone = event.data.value;
            }
            if (event.data.field === 'email') {
                this.data.email = event.data.value;
            }
            if (event.data.field === 'address') {
                this.data.address = event.data.value;
            }
            if (event.data.field === 'birthday') {
                this.data.birthday = event.data.value;
            }
            if (event.data.field === 'jobRole') {
                this.data.jobRole = event.data.value;
            }
            if (event.data.field === 'linkedIn') {
                this.data.linkedIn = event.data.value;
            }
            if (event.data.field === 'notes') {
                this.data.notes = event.data.value;
            }
        }
    }
}
