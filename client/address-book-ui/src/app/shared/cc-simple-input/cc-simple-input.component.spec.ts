import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CcSimpleInputComponent } from './cc-simple-input.component';

describe('CcInputComponent', () => {
    let component: CcSimpleInputComponent;
    let fixture: ComponentFixture<CcSimpleInputComponent>;

    let inputElement: DebugElement;
    let errorElement: DebugElement;
    let ccSimpleInputElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CcSimpleInputComponent],
        });
        fixture = TestBed.createComponent(CcSimpleInputComponent);
        component = fixture.componentInstance;
        inputElement = fixture.debugElement.query(By.css('input'));
        errorElement = fixture.debugElement.query(By.css('.error-message'));
        ccSimpleInputElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onInput event when user types', () => {
        spyOn(component.onInput, 'emit');
        inputElement.nativeElement.value = 'Test input';
        inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
        expect(component.onInput.emit).toHaveBeenCalledWith('Test input');
    });

    it('should display the correct placeholder', () => {
        component.placeholder = 'Enter your name';
        fixture.detectChanges();
        expect(inputElement.nativeElement.placeholder).toBe('Enter your name');
    });

    it('should display error message when hasError is true', () => {
        component.hasError = true;
        component.errorMessage = 'This field is required';
        fixture.detectChanges();
        const infoIconElement = ccSimpleInputElement.query(By.css('.info-icon'));
        infoIconElement.triggerEventHandler('mouseover', null);
        fixture.detectChanges(); // Apply changes after interaction
        const tooltipElement = ccSimpleInputElement.query(By.css('.tooltip-msg'));
        expect(tooltipElement).not.toBeNull(); // Tooltip should be in the DOM
        expect(tooltipElement.nativeElement.textContent).toContain('This field is required');
    });

    it('should hide error message when hasError is false', () => {
        component.hasError = false;
        fixture.detectChanges();
        expect(errorElement).toBeNull();
    });

    it('should hide tooltip when mouse leaves the info icon', () => {
        component.hasError = true;
        fixture.detectChanges();
        const infoIconElement = ccSimpleInputElement.query(By.css('.info-icon'));
        infoIconElement.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        infoIconElement.triggerEventHandler('mouseleave', null);
        fixture.detectChanges();
        const tooltipElement = ccSimpleInputElement.query(By.css('.tooltip-msg'));
        expect(tooltipElement).toBeNull(); // Tooltip should not be in the DOM
    });

    it('should not display tooltip when hasError is false', () => {
        component.hasError = false;
        fixture.detectChanges();
        const infoIconElement = ccSimpleInputElement.query(By.css('.info-icon'));
        expect(infoIconElement).toBeNull();
        const tooltipElement = ccSimpleInputElement.query(By.css('.tooltip-msg'));
        expect(tooltipElement).toBeNull();
    });
});
