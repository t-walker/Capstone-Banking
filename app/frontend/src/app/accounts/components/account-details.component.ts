import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';
import { UserService } from '../../user/services/user.service';

import {CreateAccountComponent} from "./create.component";

@Component({
    templateUrl: './app/accounts/components/account-details.html'
})


export class AccountDetailsComponent implements OnInit {

ngOnInit() {}

    constructor(private userService: UserService, private router: Router) { }

}