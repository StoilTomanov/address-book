import { Request, Response, Router } from 'express';
import { getAll, deleteRecord, createRecord, updateRecord } from '../services/address-book-records';
import { AddressBookDetailDocument } from '../models/address-book-details';

export async function getAddressBookRecords(req: Request, res: Response): Promise<void> {
    try {
        const result: AddressBookDetailDocument[] = await getAll();
        res.status(200).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteAddressBookRecord(req: Request, res: Response): Promise<void> {
    try {
        const result: AddressBookDetailDocument | null = await deleteRecord(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function createAddressBookRecord(req: Request, res: Response): Promise<void> {
    const newRecord: any = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        jobRole: req.body.jobRole,
        linkedIn: req.body.linkedIn,
        birthday: req.body.birthday,
        notes: req.body.notes,
    };

    try {
        const result: AddressBookDetailDocument = await createRecord(newRecord);
        res.status(201).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function updateAddressBookRecord(req: Request, res: Response): Promise<void> {
    // todo: do a preload middleware
    const recordId = req.params.id;
    const updatedRecord: any = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        jobRole: req.body.jobRole,
        linkedIn: req.body.linkedIn,
        birthday: req.body.birthday,
        notes: req.body.notes,
    };

    try {
        const result: AddressBookDetailDocument = await updateRecord(updatedRecord, recordId);
        res.status(200).json(result);
    } catch (e) {
        // todo: see what type of errors mongoose throw
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
