import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcButtonComponent } from './cc-button/cc-button.component';
import { CcSimpleInputComponent } from './cc-simple-input/cc-simple-input.component';

@NgModule({
    declarations: [CcButtonComponent, CcSimpleInputComponent],
    imports: [CommonModule],
    exports: [CcButtonComponent, CcSimpleInputComponent],
})
export class SharedModule {}
