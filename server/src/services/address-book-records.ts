import { AddressBookDetail, AddressBookDetailDocument } from '../models/address-book-details';

export async function getAll(): Promise<AddressBookDetailDocument[]> {
    return await AddressBookDetail.find({});
}

export async function createRecord(newRecord: AddressBookDetailDocument): Promise<AddressBookDetailDocument> {
    const result = new AddressBookDetail(newRecord);
    return await result.save();
}

export async function updateRecord(updatedRecord: AddressBookDetailDocument, recordId: string): Promise<AddressBookDetailDocument> {
    const result = await AddressBookDetail.findById({ _id: recordId });
    if (result) {
        result.name = updatedRecord.name;
        result.email = updatedRecord.email;
        result.phone = updatedRecord.phone;
        result.address = updatedRecord.address ?? '';
        result.jobRole = updatedRecord.jobRole ?? '';
        result.linkedIn = updatedRecord.linkedIn ?? '';
        result.birthday = updatedRecord.birthday ?? '';
        result.notes = updatedRecord.notes ?? '';
        return await result.save();
    } else {
        throw new Error('Record does not exists');
    }
}

export async function deleteRecord(id: string): Promise<AddressBookDetailDocument | null> {
    return await AddressBookDetail.findOneAndDelete({ _id: id });
}
