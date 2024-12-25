import { Component, output } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { finalize, takeUntil } from 'rxjs';

import { AddressRow, AddressRowChangeEvent } from '../../../models/address-book';
import { ModalChoice } from '../../../models/common';
import { RowActionsBaseComponent } from '../row-actions-base.component';

@Component({
    selector: 'app-update-row',
    templateUrl: '../row-actions-base.component.html',
    styleUrl: '../row-actions-base.component.scss',
    standalone: false,
})
export class UpdateRowComponent extends RowActionsBaseComponent {
    readonly close = output<AddressRowChangeEvent>();

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

    deleteRow(): void {
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

    override onDeleteChoice(choice: ModalChoice): void {
        if (choice === 'Confirm') {
            this.deleteRow();
        }
        this.showDeleteRowConfirmation = false;
    }

    override confirmDeleteRow(): void {
        this.showDeleteRowConfirmation = true;
    }

    override closeModal(): void {
        this.close.emit({ row: null, action: 'none' });
    }
}
