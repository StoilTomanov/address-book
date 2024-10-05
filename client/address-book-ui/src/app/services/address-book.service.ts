import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddressRow } from '../models/address-book';

@Injectable({
    providedIn: 'root',
})
export class AddressBookService {
    private backendUrl: string = 'http://localhost:3000/address-book';

    constructor(private http: HttpClient) {}

    getAllAddressBookRecords(): Observable<AddressRow[]> {
        return this.http.get<AddressRow[]>(this.backendUrl);
    }

    createAddressBookRecord(newRecord: AddressRow): Observable<AddressRow> {
        return this.http.post<AddressRow>(`${this.backendUrl}/create`, {
            name: newRecord.name,
            email: newRecord.email,
            phone: newRecord.phone,
            address: newRecord.address,
            jobRole: newRecord.jobRole,
            linkedIn: newRecord.linkedIn,
            birthday: newRecord.birthday,
            notes: newRecord.notes,
        });
    }

    updateAddressBookRecord(updatedRecord: AddressRow, id: string): Observable<AddressRow> {
        return this.http.put<AddressRow>(`${this.backendUrl}/update/${id}`, {
            name: updatedRecord.name,
            email: updatedRecord.email,
            phone: updatedRecord.phone,
            address: updatedRecord.address,
            jobRole: updatedRecord.jobRole,
            linkedIn: updatedRecord.linkedIn,
            birthday: updatedRecord.birthday,
            notes: updatedRecord.notes,
        });
    }

    deleteAddressBookRecord(id: string): Observable<AddressRow> {
        return this.http.delete<AddressRow>(`${this.backendUrl}/delete/${id}`);
    }
}
