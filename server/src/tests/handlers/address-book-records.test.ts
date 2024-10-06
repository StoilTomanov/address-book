import request from 'supertest';
import app from '../..';
import * as addressBookRecordsController from '../../controllers/address-book-records';
import { dummyAddressBookRecords } from '../test-data';

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../controllers/address-book-records', () => ({
    getAddressBookRecords: jest.fn(),
    createAddressBookRecord: jest.fn(),
    updateAddressBookRecord: jest.fn(),
    deleteAddressBookRecord: jest.fn(),
}));

describe('Address book records handler', () => {
    beforeEach(() => {
        // Explicitly cast to jest.Mock
        (addressBookRecordsController.getAddressBookRecords as jest.Mock).mockImplementation((req, res) => {
            res.status(200).json(dummyAddressBookRecords);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call getAddressBookRecords controller when GET /address-book is hit', async () => {
        const response = await request(app).get('/address-book');

        expect(response.status).toEqual(200);
        expect(addressBookRecordsController.getAddressBookRecords).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual(dummyAddressBookRecords);
    });
});
