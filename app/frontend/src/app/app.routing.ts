import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";
import {RegisterComponent} from "./register/components/register.component";
import {LoginComponent} from "./login/components/login.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent, data: {title: 'About'}},
    {path: 'home', component: HomeComponent, data: {title: 'Home'}},
    {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}}
    ];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
