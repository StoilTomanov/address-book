import mongoose from 'mongoose';

const AddressBookDetailSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, default: '' },
    jobRole: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    birthday: { type: String, default: '' },
    notes: { type: String, default: '' },
});

export const AddressBookDetail = mongoose.model('AddressBookDetail', AddressBookDetailSchema);
