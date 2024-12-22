import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-enter-address-book',
    templateUrl: './enter-address-book.component.html',
    styleUrls: ['./enter-address-book.component.scss'],
    standalone: false,
})
export class EnterAddressBookComponent {
    router: Router = inject(Router);

    name: string | undefined;
    isDisabled: boolean = true;
    hasError: boolean = false;

    onInputTyping(inputValue: string): void {
        this.name = inputValue.trim();
        this.isDisabled = !this.name;
        this.hasError = !this.name;
    }

    onEnterAddressBook(): void {
        if (this.name && !!this.name.trim()) {
            this.router.navigate(['/address-book']);
        }
    }
}
