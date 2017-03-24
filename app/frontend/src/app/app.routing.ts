import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/home/home.component";
import {SettingsComponent} from "./settings/settings/settings.component";

import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";

import {AccountsComponent} from "./account/account/accounts.component";
import {AccountDetailsComponent} from "./account/details/details.component";
import {TransferComponent} from "./transfer/transfer/transfer.component";

import {LoanApplicationComponent} from "./loan/application/application.component";
import {UserLoanListingComponent} from "./loan/userlisting/userlisting.component";
import {OfficerLoanListingComponent} from "./loan/officerlisting/officerlisting.component";

import {LoanReviewComponent} from "./loan/review/review.component";

import {LandingComponent} from "./landing/components/landing.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent, data: {title: 'About'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}},
    {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'landing', component: LandingComponent, data: {title: 'Landing'}},
    {path: 'accounts', component: AccountsComponent, data: {title: 'Accounts'}},
    {path: 'loan_application', component: LoanApplicationComponent, data: {title: 'Loan Application'}},
    {path: 'loans/review/:id', component: LoanReviewComponent, data: {title: 'Loan Approval'}},
    {path: 'my/loans', component: UserLoanListingComponent, data: {title: 'Your Loans'}},
    {path: 'review/loans', component: OfficerLoanListingComponent, data: {title: 'Your Loans'}},
    {path: 'account/:id', component: AccountDetailsComponent, data: {title: 'AccountDetails'}},
    {path: 'transfer', component: TransferComponent, data: {title: 'Transfer'}},
    {path: 'initial_application', component: LoanApplicationComponent, data: {title: 'Loan Application'}},
    {path: 'settings', component: SettingsComponent, data: {title: 'Settings'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
