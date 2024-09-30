import { Request, Response, Router } from 'express';
import { getAll, deleteRecord } from '../services/address-book-records';

export const addressBookRecordsController = Router();

addressBookRecordsController.get('/', getAddressBookRecords);
addressBookRecordsController.delete('/delete/:id', deleteAddressBookRecord);

async function getAddressBookRecords(req: Request, res: Response) {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteAddressBookRecord(req: Request, res: Response) {
    try {
        const result = await deleteRecord(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
