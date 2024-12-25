import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
    selector: 'app-cc-button',
    templateUrl: './cc-button.component.html',
    styleUrls: ['./cc-button.component.scss'],
    standalone: false,
})
export class CcButtonComponent {
    readonly onClicked: OutputEmitterRef<void> = output<void>();
    readonly isDisabled: InputSignal<boolean> = input<boolean>(false);
    readonly setPrimaryStyle: InputSignal<boolean> = input<boolean>(false);
    readonly value: InputSignal<string> = input<string>('');

    onButtonClicked(): void {
        this.onClicked.emit();
    }
}
