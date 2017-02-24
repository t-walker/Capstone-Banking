import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";
import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";
import {AccountsComponent} from "./accounts/components/accounts.component";
import {AccountDetailsComponent} from "./accounts/components/account-details.component";
import {TransferComponent} from "./transfer/components/transfer.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent, data: {title: 'About'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}},
    {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'accounts', component: AccountsComponent, data: {title: 'Accounts'}},
    {path: 'account/:id', component: AccountDetailsComponent, data: {title: 'AccountDetails'}},
    {path: 'transfer', component: TransferComponent, data: {title: 'Transfer'}}
    ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
