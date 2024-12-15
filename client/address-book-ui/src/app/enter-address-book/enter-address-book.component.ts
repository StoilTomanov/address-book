import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { AppState } from '../models/app-state';
import { logInAction } from '../state/actions/auth.actions';
import { selectIsUserLoggedIn } from '../state/selectors/auth-selector';

@Component({
    selector: 'app-enter-address-book',
    templateUrl: './enter-address-book.component.html',
    styleUrls: ['./enter-address-book.component.scss'],
})
export class EnterAddressBookComponent {
    name: string | undefined;
    isDisabled: boolean = true;
    hasError: boolean = false;

    constructor(
        private router: Router,
        private store: Store<AppState>,
    ) {
    }

    onInputTyping(inputValue: string): void {
        this.name = inputValue.trim();
        this.isDisabled = !this.name;
        this.hasError = !this.name;
    }

    onEnterAddressBook(): void {
        if (this.name && !!this.name.trim()) {
            this.store.dispatch(logInAction());
            this.store.pipe(select(selectIsUserLoggedIn)).subscribe((isUserLoggedIn) => {
                if (isUserLoggedIn) {
                    this.router.navigate(['/address-book'])
                }
            });
        }
    }
}
