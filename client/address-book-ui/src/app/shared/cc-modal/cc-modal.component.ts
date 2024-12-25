import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

import { ModalChoice } from '../../models/common';

@Component({
    selector: 'app-cc-modal',
    templateUrl: './cc-modal.component.html',
    styleUrl: './cc-modal.component.scss',
    standalone: false,
})
export class CcModalComponent {
    readonly choice: OutputEmitterRef<ModalChoice> = output<ModalChoice>();
    readonly message: InputSignal<string> = input<string>('');

    onConfirm(): void {
        this.choice.emit('Confirm');
    }

    onCancel(): void {
        this.choice.emit('Cancel');
    }
}
