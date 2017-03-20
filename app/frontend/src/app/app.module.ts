import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {NavComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./layout/footer/footer.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/home/home.component";
import {SettingsComponent} from "./settings/components/settings.component";

import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";

import {AccountsComponent} from "./account/account/accounts.component";
import {CreateAccountComponent} from "./account/create/create.component";
import {AccountDetailsComponent} from "./account/details/details.component";
import {AccountListingComponent} from "./account/listing/listing.component";

import {LoanApplicationComponent} from "./loan/application/application.component";
import {LoanListingComponent} from "./loan/listing/listing.component";
import {LoanReviewComponent} from "./loan/review/review.component";

import {LandingComponent} from "./landing/components/landing.component";

import {TransferComponent} from "./transfer/transfer/transfer.component";
import { TransferUserComponent } from './transfer/user/user.component';
import { TransferInternalComponent } from './transfer/internal/internal.component';

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
        LoanReviewComponent,
        LandingComponent,
        TransferComponent,
        TransferInternalComponent,
        TransferUserComponent,
        SettingsComponent
    ],
    providers: [
        appRoutingProviders,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
