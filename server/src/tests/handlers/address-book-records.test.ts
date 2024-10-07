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
        (addressBookRecordsController.getAddressBookRecords as jest.Mock).mockImplementation((req, res) => {
            res.status(200).json(dummyAddressBookRecords);
        });
        (addressBookRecordsController.createAddressBookRecord as jest.Mock).mockImplementation((req, res) => {
            res.status(201).json(dummyAddressBookRecords[0]);
        });
        (addressBookRecordsController.updateAddressBookRecord as jest.Mock).mockImplementation((req, res) => {
            res.status(200).json(dummyAddressBookRecords[0]);
        });
        (addressBookRecordsController.deleteAddressBookRecord as jest.Mock).mockImplementation((req, res) => {
            res.status(200).json(dummyAddressBookRecords[2]);
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

    it('should call getAddressBookRecords controller when POST /address-book/create is hit', async () => {
        const response = await request(app).post('/address-book/create');
        expect(response.status).toEqual(201);
        expect(addressBookRecordsController.createAddressBookRecord).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual(dummyAddressBookRecords[0]);
    });

    it('should call getAddressBookRecords controller when POST /address-book/update/:id is hit', async () => {
        const response = await request(app).put('/address-book/update/123');
        expect(response.status).toEqual(200);
        expect(addressBookRecordsController.updateAddressBookRecord).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual(dummyAddressBookRecords[1]);
    });

    it('should call getAddressBookRecords controller when POST /address-book/delete/:id is hit', async () => {
        const response = await request(app).delete('/address-book/delete/123');
        expect(response.status).toEqual(200);
        expect(addressBookRecordsController.deleteAddressBookRecord).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual(dummyAddressBookRecords[2]);
    });
});
