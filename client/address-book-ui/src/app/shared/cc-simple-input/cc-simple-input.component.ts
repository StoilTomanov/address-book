import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
    selector: 'app-cc-simple-input',
    templateUrl: './cc-simple-input.component.html',
    styleUrls: ['./cc-simple-input.component.scss'],
    standalone: false,
})
export class CcSimpleInputComponent {
    readonly onInput: OutputEmitterRef<string> = output<string>();
    readonly hasError: InputSignal<boolean> = input<boolean>(false);
    readonly placeholder: InputSignal<string> = input<string>('');
    readonly errorMessage: InputSignal<string> = input<string>('');
    readonly width: InputSignal<string> = input<string>('10rem');
    readonly value: InputSignal<string> = input<string>('');

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
