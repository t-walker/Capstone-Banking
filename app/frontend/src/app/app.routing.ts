import {Routes, RouterModule} from "@angular/router";
import {TaskListComponent} from "./todo/components/task-list.component";
import {ModuleWithProviders} from "@angular/core";

import {AboutComponent} from "./about/components/about.component";
import {HomeComponent} from "./home/components/home.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'about', component: AboutComponent, data: {title: 'About'}}
    {path: 'home', component: HomeComponent, data: {title: 'Home'}}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
