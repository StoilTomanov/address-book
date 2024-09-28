import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcButtonComponent } from './cc-button/cc-button.component';

@NgModule({
    declarations: [CcButtonComponent],
    imports: [CommonModule],
    exports: [CcButtonComponent],
})
export class SharedModule {}
