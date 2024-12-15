import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AgGridModule } from 'ag-grid-angular';

import { AddressBookMainComponent } from './address-book-main/address-book-main.component';
/* eslint-disable-next-line max-len */
import { CreateOrEditAddressBookRow } from './address-book-main/create-or-edit-address-book-row/create-or-edit-address-book-row.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterAddressBookComponent } from './enter-address-book/enter-address-book.component';
import { SharedModule } from './shared/shared.module';
import { authReducer } from './state/reducers/auth.reducer';

@NgModule({
    declarations: [AppComponent, EnterAddressBookComponent, AddressBookMainComponent, CreateOrEditAddressBookRow],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule, AgGridModule,
        HttpClientModule,
        StoreModule.forRoot({auth: authReducer}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
