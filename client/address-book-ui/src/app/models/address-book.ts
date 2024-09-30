export interface AddressRow {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    jobRole?: string;
    linkedIn?: string;
    birthday?: string;
    notes?: string;
    expanded: boolean;
}

export interface EditRow {
    field: keyof AddressRow;
    displayableField: string;
    value: string;
}

export interface AddressRowChangeEvent {
    row: AddressRow | null;
    action: 'delete' | 'save' | 'none';
}
