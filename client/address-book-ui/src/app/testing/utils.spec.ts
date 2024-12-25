import { getDefaultAddressBookRecords } from './utils';
import { AddressRow } from '../models/address-book';

describe('When using getDefaultAddressBookRecords', () => {
    let result: AddressRow[];

    it('it returns default address book records', () => {
        result = getDefaultAddressBookRecords(false);
        expect(result).toEqual([
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
        ]);
    });

    it('it returns default address book records with full data', () => {
        result = getDefaultAddressBookRecords(true);
        expect(result).toEqual([
            {
                _id: '123',
                name: 'Mike',
                email: 'mike@email.com',
                phone: '+123 456 789',
                expanded: false,
                address: 'dummy address',
                jobRole: 'dummy job role',
                linkedIn: 'dummy linkedIn',
                birthday: '15-03-1991',
                notes: 'dummy notes',
            },
            {
                _id: '456',
                name: 'Anne',
                email: 'anne@email.com',
                phone: '+987 654 321',
                expanded: false,
                address: 'dummy address',
                jobRole: 'dummy job role',
                linkedIn: 'dummy linkedIn',
                birthday: '15-03-1991',
                notes: 'dummy notes',
            },
        ]);
    });
});
