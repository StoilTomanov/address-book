import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EnterAddressBookComponent } from './enter-address-book.component';
import { CcButtonComponent } from '../shared/cc-button/cc-button.component';
import { CcSimpleInputComponent } from '../shared/cc-simple-input/cc-simple-input.component';

describe('EnterAddressBookComponent', () => {
    let component: EnterAddressBookComponent;
    let fixture: ComponentFixture<EnterAddressBookComponent>;
    let element: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EnterAddressBookComponent, CcButtonComponent, CcSimpleInputComponent],
        });
        fixture = TestBed.createComponent(EnterAddressBookComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('When user types in the input', () => {
        let buttonElement: CcButtonComponent;

        beforeEach(() => {
            buttonElement = element.query(By.directive(CcButtonComponent)).componentInstance;
            component.onInputTyping(' Dummy user  ');
            fixture.detectChanges();
        });

        it('it sets the name property correctly', () => {
            expect(component.name).toEqual('Dummy user');
        });

        it('it sets enables the Enter button', () => {
            expect(component.isDisabled).toBeFalse();
            expect(buttonElement.isDisabled).toBeFalse();
        });

        describe('When user deletes it"s input', () => {
            beforeEach(() => {
                component.onInputTyping('');
                fixture.detectChanges();
            });

            it('it sets the name property correctly', () => {
                expect(component.name).toEqual('');
            });

            it('it sets enables the Enter button', () => {
                expect(component.isDisabled).toBeTrue();
                expect(buttonElement.isDisabled).toBeTrue();
            });
        });
    });
});
