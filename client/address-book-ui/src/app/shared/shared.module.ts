import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CcButtonComponent } from './cc-button/cc-button.component';
import { CcModalComponent } from './cc-modal/cc-modal.component';
import { CcSimpleInputComponent } from './cc-simple-input/cc-simple-input.component';

@NgModule({
    declarations: [CcButtonComponent, CcSimpleInputComponent, CcModalComponent],
    imports: [CommonModule],
    exports: [CcButtonComponent, CcSimpleInputComponent, CcModalComponent],
})
export class SharedModule {}
