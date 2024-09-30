import { AddressBookDetail, AddressBookDetailDocument } from '../models/address-book-details';

export async function getAll(): Promise<AddressBookDetailDocument[]> {
    return await AddressBookDetail.find({});
}

export async function deleteRecord(id: string): Promise<AddressBookDetailDocument[] | null> {
    return await AddressBookDetail.findOneAndDelete({ _id: id });
}
