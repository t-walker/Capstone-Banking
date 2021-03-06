import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing';
import {RouterModule} from '@angular/router';

import {AppComponent} from "./app.component";
import {NavComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./layout/footer/footer.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/home/home.component";
import {LandingComponent} from "./landing/components/landing.component";
import {SettingsComponent} from "./settings/settings/settings.component";

import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";

import {CreditScoreComponent} from "./credit-score/credit-score.component";

import {AccountsComponent} from "./account/account/accounts.component";
import {CreateAccountComponent} from "./account/create/create.component";
import {AccountDetailsComponent} from "./account/details/details.component";
import {AccountListingComponent} from "./account/listing/listing.component";

import {LoanApplicationComponent} from "./loan/application/application.component";
import {UserLoanListingComponent} from "./loan/userlisting/userlisting.component";
import {OfficerLoanListingComponent} from "./loan/officerlisting/officerlisting.component";
import {LoanReviewComponent} from "./loan/review/review.component";

import {TransferComponent} from "./transfer/transfer/transfer.component";
import {TransferUserComponent} from './transfer/user/user.component';
import {TransferInternalComponent} from './transfer/internal/internal.component';

import {MarketplaceItemComponent} from "./marketplace/item/item.component";
import {MarketplaceListComponent} from "./marketplace/list/list.component";

import {UserService} from "./user/services/user.service";

import {HttpModule}    from '@angular/http';
import {LocalStorageModule} from 'angular-2-local-storage';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
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
        UserLoanListingComponent,
        OfficerLoanListingComponent,
        AccountDetailsComponent,
        AccountListingComponent,
        LoanReviewComponent,
        LandingComponent,
        TransferComponent,
        TransferInternalComponent,
        TransferUserComponent,
        SettingsComponent,
        MarketplaceListComponent,
        MarketplaceItemComponent,
        CreditScoreComponent
    ],
    providers: [
        appRoutingProviders,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
