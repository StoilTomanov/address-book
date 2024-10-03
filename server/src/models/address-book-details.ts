import mongoose, { Document, Schema } from 'mongoose';

const AddressBookDetailSchema: Schema<AddressBookDetailDocument> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    jobRole: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    birthday: { type: String, default: '' },
    notes: { type: String, default: '' },
});

export interface AddressBookDetailDocument extends Document {
    name: string;
    email: string;
    phone: string;
    address?: string;
    jobRole?: string;
    linkedIn?: string;
    birthday?: string;
    notes?: string;
}

export const AddressBookDetail = mongoose.model('AddressBookDetail', AddressBookDetailSchema);
