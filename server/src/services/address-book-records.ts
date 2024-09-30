import { AddressBookDetail, AddressBookDetailDocument } from '../models/address-book-details';

export async function getAll(): Promise<AddressBookDetailDocument[]> {
    return await AddressBookDetail.find({});
}

export async function createRecord(newRecord: AddressBookDetailDocument): Promise<AddressBookDetailDocument> {
    const result = new AddressBookDetail(newRecord);
    return await result.save();
}

export async function deleteRecord(id: string): Promise<AddressBookDetailDocument[] | null> {
    return await AddressBookDetail.findOneAndDelete({ _id: id });
}
