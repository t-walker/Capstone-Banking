import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {NavComponent} from "./layout/navbar/navbar.component";
import {FooterComponent} from "./layout/footer/footer.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";
import {RegisterComponent} from "./register/components/register.component";

import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        RegisterComponent,
        NavComponent,
        FooterComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
