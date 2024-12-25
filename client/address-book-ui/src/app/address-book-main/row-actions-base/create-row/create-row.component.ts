import { Component, inject, output } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { finalize, takeUntil } from 'rxjs';

import { AddressRow, AddressRowChangeEvent } from '../../../models/address-book';
import { AddressBookService } from '../../../services/address-book.service';
import { RowActionsBaseComponent } from '../row-actions-base.component';

@Component({
    selector: 'app-create-row',
    templateUrl: '../row-actions-base.component.html',
    styleUrl: '../row-actions-base.component.scss',
    standalone: false,
})
export class CreateRowComponent extends RowActionsBaseComponent {
    readonly close = output<AddressRowChangeEvent>();

    addressBookService: AddressBookService = inject(AddressBookService);

    override onGridReady(_params: GridReadyEvent): void {
        this.rowAction = 'Add Row';
    }

    override createRow(): void {
        const data = this.data();
        if (data) {
            this.isLoading = true;
            this.createAddressBookRecord(data);
        }
    }

    private createAddressBookRecord(rowData: AddressRow): void {
        this.addressBookService
            .createAddressBookRecord(rowData)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((createdRecord) => {
                this.close.emit({ row: createdRecord, action: 'create' });
            });
    }

    override closeModal(): void {
        this.close.emit({ row: null, action: 'none' });
    }
}
