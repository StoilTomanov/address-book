import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-cc-button',
    templateUrl: './cc-button.component.html',
    styleUrls: ['./cc-button.component.scss'],
    standalone: false,
})
export class CcButtonComponent {
    readonly onClicked = output<void>();
    readonly isDisabled = input<boolean>(false);
    readonly setPrimaryStyle = input<boolean>(false);
    readonly value = input<string>('');

    onButtonClicked(): void {
        this.onClicked.emit();
    }
}
