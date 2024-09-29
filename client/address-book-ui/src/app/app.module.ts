import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterAddressBookComponent } from './enter-address-book/enter-address-book.component';
import { SharedModule } from './shared/shared.module';
import { AddressBookMainComponent } from './address-book-main/address-book-main.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [AppComponent, EnterAddressBookComponent, AddressBookMainComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule, AgGridModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
