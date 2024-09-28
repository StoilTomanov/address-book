import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSimpleInputComponent } from './cc-simple-input.component';

describe('CcInputComponent', () => {
    let component: CcSimpleInputComponent;
    let fixture: ComponentFixture<CcSimpleInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CcSimpleInputComponent],
        });
        fixture = TestBed.createComponent(CcSimpleInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
