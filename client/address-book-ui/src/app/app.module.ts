import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AddressBookMainComponent } from './address-book-main/address-book-main.component';
/* eslint-disable-next-line max-len */
import { CreateOrEditAddressBookRow } from './address-book-main/create-or-edit-address-book-row/create-or-edit-address-book-row.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterAddressBookComponent } from './enter-address-book/enter-address-book.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, EnterAddressBookComponent, AddressBookMainComponent, CreateOrEditAddressBookRow],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule, AgGridModule],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
