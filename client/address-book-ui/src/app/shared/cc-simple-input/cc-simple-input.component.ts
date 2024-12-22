import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-cc-simple-input',
    templateUrl: './cc-simple-input.component.html',
    styleUrls: ['./cc-simple-input.component.scss'],
    standalone: false,
})
export class CcSimpleInputComponent {
    readonly onInput = output<string>();
    readonly hasError = input<boolean>(false);
    readonly placeholder = input<string>('');
    readonly errorMessage = input<string>('');
    readonly width = input<string>('10rem');
    readonly value = input<string>('');

    showTooltipElement: boolean = false;

    onInputTyping(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value.trim();
        this.onInput.emit(inputValue);
    }

    showTooltip(): void {
        this.showTooltipElement = true;
    }

    hideTooltip(): void {
        this.showTooltipElement = false;
    }
}
