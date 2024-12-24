import { AddressRow } from '../models/address-book';

export function getDefaultAddressBookRecords(useFull: boolean = false): AddressRow[] {
    const records: AddressRow[] = [
        {
            _id: '123',
            name: 'Mike',
            email: 'mike@email.com',
            phone: '+123 456 789',
            expanded: false,
        },
        {
            _id: '456',
            name: 'Anne',
            email: 'anne@email.com',
            phone: '+987 654 321',
            expanded: false,
        },
    ];

    if (useFull) {
        records.forEach((record) => {
            record.address = 'dummy address';
            record.jobRole = 'dummy job role';
            record.linkedIn = 'dummy linkedIn';
            record.birthday = '15-03-1991';
            record.notes = 'dummy notes';
        });
    }

    return records;
}
