import { Component, inject, output } from '@angular/core';
import { CellValueChangedEvent, GridReadyEvent } from 'ag-grid-community';
import { finalize, takeUntil } from 'rxjs';

import { AddressRow, AddressRowChangeEvent, EditRow } from '../../../models/address-book';
import { AddressBookService } from '../../../services/address-book.service';
import { RowActionsBaseComponent } from '../row-actions-base.component';

@Component({
    selector: 'app-update-row',
    templateUrl: '../row-actions-base.component.html',
    styleUrl: '../row-actions-base.component.scss',
    standalone: false,
})
export class UpdateRowComponent extends RowActionsBaseComponent {
    readonly close = output<AddressRowChangeEvent>();

    addressBookService: AddressBookService = inject(AddressBookService);

    override onGridReady(_params: GridReadyEvent): void {
        this.rowAction = 'Edit Row';
    }

    override updateRow(): void {
        const data = this.data();
        if (data) {
            this.isLoading = true;
            this.updateAddressBookRecord(data, data._id);
        }
    }

    private updateAddressBookRecord(rowData: AddressRow, dataRowId: string): void {
        this.addressBookService
            .updateAddressBookRecord(rowData, dataRowId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((updatedRecord) => {
                this.close.emit({ row: updatedRecord, action: 'update' });
            });
    }

    override deleteRow(): void {
        this.isLoading = true;
        const data = this.data();
        if (data) {
            this.addressBookService
                .deleteAddressBookRecord(data._id)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => (this.isLoading = false)),
                )
                .subscribe((deletedRecord) => {
                    this.close.emit({ row: deletedRecord, action: 'delete' });
                });
        }
    }

    override closeModal(): void {
        this.close.emit({ row: null, action: 'none' });
    }

    override onCellValueChanged(event: CellValueChangedEvent<EditRow>): void {
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
