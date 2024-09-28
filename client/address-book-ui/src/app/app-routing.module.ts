import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookMainComponent } from './address-book-main/address-book-main.component';
import { EnterAddressBookComponent } from './enter-address-book/enter-address-book.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EnterAddressBookComponent,
    },
    {
        path: 'address-book',
        pathMatch: 'full',
        component: AddressBookMainComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
