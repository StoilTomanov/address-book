import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AddressBookService } from './address-book.service';

describe('AddressBookService', () => {
    let service: AddressBookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(AddressBookService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
