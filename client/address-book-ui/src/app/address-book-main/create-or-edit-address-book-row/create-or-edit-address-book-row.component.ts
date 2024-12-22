import { Component, inject, OnChanges, SimpleChanges, input, output } from '@angular/core';
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
    readonly data = input<AddressRow>();
    readonly close = output<AddressRowChangeEvent>();

    addressBookService: AddressBookService = inject(AddressBookService);

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

    ngOnChanges(_changes: SimpleChanges): void {
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
        this.rowAction = this.data()?._id ? 'Edit Row' : 'Add Row';
    }

    saveRow(): void {
        const data = this.data();
        if (data) {
            this.isLoading = true;
            const dataRowId = data._id;
            const shouldCreateRow = dataRowId === '';
            if (shouldCreateRow) {
                this.createAddressBookRecord(data);
            } else {
                this.updateAddressBookRecord(data, dataRowId);
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
        const data = this.data();
        if (data) {
            this.addressBookService
                .deleteAddressBookRecord(data._id)
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
}
