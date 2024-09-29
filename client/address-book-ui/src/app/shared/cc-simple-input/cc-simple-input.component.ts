import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cc-simple-input',
    templateUrl: './cc-simple-input.component.html',
    styleUrls: ['./cc-simple-input.component.scss'],
})
export class CcSimpleInputComponent {
    @Output() onInput: EventEmitter<string> = new EventEmitter<string>();
    @Input() hasError: boolean = false;
    @Input() placeholder: string = '';
    @Input() errorMessage: string = '';
    @Input() width: string = '10rem';
    @Input() value: string = '';

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
