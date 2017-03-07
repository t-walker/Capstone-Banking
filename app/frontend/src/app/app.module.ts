import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {NavComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./layout/footer/footer.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";

import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";

import {AccountsComponent} from "./accounts/components/accounts.component";
import {CreateAccountComponent} from "./accounts/components/create.component";
import {AccountDetailsComponent} from "./accounts/components/account-details.component";
import {AccountListingComponent} from "./accounts/components/account-listing.component";

import {LoanApplicationComponent} from "./loan/application/application.component";
import {LoanListingComponent} from "./loan/listing/listing.component";
import {LoanApprovalComponent} from "./loan/approval/approval.component";

import {LandingComponent} from "./landing/components/landing.component";

import {UserService} from "./user/services/user.service";

import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';

import {HttpModule}    from '@angular/http';
import {LocalStorageModule} from 'angular-2-local-storage';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        HttpModule,
        routing,
        LocalStorageModule.withConfig({prefix: 'app', storageType: 'sessionStorage'})
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        RegisterComponent,
        NavComponent,
        FooterComponent,
        LoginComponent,
        AccountsComponent,
        CreateAccountComponent,
        LoanApplicationComponent,
        LoanListingComponent,
        AccountDetailsComponent,
        AccountListingComponent,
        LandingComponent
    ],
    providers: [
        appRoutingProviders,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
