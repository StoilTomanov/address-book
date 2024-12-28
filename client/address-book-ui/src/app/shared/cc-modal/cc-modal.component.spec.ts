import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CcModalComponent } from './cc-modal.component';
import { CcButtonComponent } from '../cc-button/cc-button.component';

describe('CcModalComponent', () => {
    let component: CcModalComponent;
    let componentRef: ComponentRef<CcModalComponent>;
    let fixture: ComponentFixture<CcModalComponent>;
    let modalElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CcModalComponent, CcButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CcModalComponent);
        componentRef = fixture.componentRef;
        component = fixture.componentInstance;
        modalElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('When choice is "Confirm"', () => {
        beforeEach(() => {
            spyOn(component.choice, 'emit');
            component.onConfirm();
        });

        it('it should emit "Confirm"', () => {
            expect(component.choice.emit).toHaveBeenCalledOnceWith('Confirm');
        });
    });

    describe('When choice is "Cancel"', () => {
        beforeEach(() => {
            spyOn(component.choice, 'emit');
            component.onCancel();
        });

        it('it should emit "Confirm"', () => {
            expect(component.choice.emit).toHaveBeenCalledOnceWith('Cancel');
        });
    });

    describe('When a message is received', () => {
        beforeEach(() => {
            componentRef.setInput('message', 'Hello World');
            fixture.detectChanges();
        });

        it('it should have the correct message in the view', () => {
            const modal = modalElement.query(By.css('.modal-content p')).nativeElement;
            expect(modal.textContent).toEqual('Hello World');
        });
    });
});
