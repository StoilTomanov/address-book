import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CcButtonComponent } from './cc-button.component';

describe('CcButtonComponent', () => {
    let component: CcButtonComponent;
    let componentRef: ComponentRef<CcButtonComponent>;
    let fixture: ComponentFixture<CcButtonComponent>;

    let buttonElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CcButtonComponent],
        });
        fixture = TestBed.createComponent(CcButtonComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        buttonElement = fixture.debugElement.query(By.css('button'));
        fixture.detectChanges();
    });

    it('it should create', () => {
        expect(component).toBeTruthy();
    });

    it('it emits onClicked event when button is clicked', () => {
        spyOn(component.onClicked, 'emit');
        buttonElement.triggerEventHandler('click', null);
        expect(component.onClicked.emit).toHaveBeenCalledOnceWith();
    });

    it('it disables the button when isDisabled is true', () => {
        componentRef.setInput('isDisabled', true);
        fixture.detectChanges();
        expect(buttonElement.nativeElement.disabled).toBeTrue();
    });

    it('it enables the button when isDisabled is false', () => {
        componentRef.setInput('isDisabled', false);
        fixture.detectChanges();
        expect(buttonElement.nativeElement.disabled).toBeFalse();
    });

    it('it applies primary style class when setPrimaryStyle is true', () => {
        componentRef.setInput('setPrimaryStyle', true);
        fixture.detectChanges();
        expect(buttonElement.classes['primary']).toBeTrue();
    });

    it('it does not apply primary style class when setPrimaryStyle is false', () => {
        componentRef.setInput('setPrimaryStyle', false);
        fixture.detectChanges();
        expect(buttonElement.classes['primary']).toBeFalsy();
    });

    it('it displays the correct value as button text', () => {
        componentRef.setInput('value', 'Click Me');
        fixture.detectChanges();
        expect(buttonElement.nativeElement.textContent).toContain('Click Me');
    });
});
