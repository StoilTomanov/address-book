import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cc-button',
    templateUrl: './cc-button.component.html',
    styleUrls: ['./cc-button.component.scss'],
})
export class CcButtonComponent {
    @Output() onClicked: EventEmitter<void> = new EventEmitter<void>();
    @Input() isDisabled: boolean = false;
    @Input() setPrimaryStyle: boolean = false;
    @Input() value: string = '';

    onButtonClicked(): void {
        this.onClicked.emit();
    }
}
