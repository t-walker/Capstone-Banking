import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {NavComponent} from "./app.component";
import {FooterComponent} from "./app.component";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";

import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
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
