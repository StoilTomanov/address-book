import { Component } from '@angular/core';

@Component({
    selector: 'app-enter-address-book',
    templateUrl: './enter-address-book.component.html',
    styleUrls: ['./enter-address-book.component.scss'],
})
export class EnterAddressBookComponent {
    name: string | undefined;
    isDisabled: boolean = true;

    constructor() {}

    onInputTyping(event: Event): void {
        this.name = (event.target as HTMLInputElement).value.trim();
        this.isDisabled = !this.name;
    }

    onEnterAddressBook(): void {
        if (this.name && !!this.name.trim()) {
            console.log(this.name);
        }
    }
}
