import { Component } from '@angular/core';
import { AddressRow } from '../models/address-book';

@Component({
    selector: 'app-address-book-main',
    templateUrl: './address-book-main.component.html',
    styleUrls: ['./address-book-main.component.scss'],
})
export class AddressBookMainComponent {
    rows: AddressRow[] = [
        { id: 123, name: 'John', phone: '+359 885 745 458', email: 'john.doe@email.com', expanded: false },
        { id: 456, name: 'Sara', phone: '+359 456 123 753', email: 'sara.doe@email.com', expanded: true },
    ];

    toggleRowDetails(row: AddressRow): void {
        this.rows.map((rowInRows) => {
            if (row.id === rowInRows.id) {
                row.expanded = !row.expanded;
            } else {
                rowInRows.expanded = false;
            }
        });
    }
}
