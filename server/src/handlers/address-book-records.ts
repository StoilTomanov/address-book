import { Router } from 'express';
import {
    getAddressBookRecords,
    createAddressBookRecord,
    updateAddressBookRecord,
    deleteAddressBookRecord,
} from '../controllers/address-book-records';

export const addressBookRecordsHandler = Router();

// Route handlers that call the controllers
addressBookRecordsHandler.get('/', getAddressBookRecords);
addressBookRecordsHandler.post('/create', createAddressBookRecord);
addressBookRecordsHandler.put('/update/:id', updateAddressBookRecord);
addressBookRecordsHandler.delete('/delete/:id', deleteAddressBookRecord);
