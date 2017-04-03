import {Component, OnInit} from "@angular/core";
import { UserService } from '../../user/services/user.service';
import {SettingsService} from './settings.service';

@Component({
  templateUrl: "./app/settings/settings/settings.html",
  providers: [SettingsService]
})

export class SettingsComponent implements OnInit {
  private user;

  private account;
  private fname: string;
  private lname: string;
  private email: string;
  private old_password: string;
  private new_password: string;
  private confirm_password: string;
  private defaultDepositId: number;

  private accounts;

  constructor(private userService: UserService, private settingsService: SettingsService) {
    this.userService.user.subscribe(
      user => {
        this.user = user;
        this.fname = this.user['first_name'];
        this.lname = this.user['last_name'];
        this.email = this.user['email'];
        this.defaultDepositId = this.user['default_account'];
      }
    );

    this.userService.getAccounts().subscribe(accounts => { this.accounts = accounts.result; });
  }

  ngOnInit() {
    console.log("Settings component initialized ...");
  }

  submit() {
    let accountData = {};

    accountData['first_name'] = this.fname;
    accountData['last_name'] = this.lname;
    accountData['email'] = this.email;
    accountData['old_password'] = this.old_password;
    accountData['new_password'] = this.new_password;
    accountData['default_account'] = this.account;
    console.log(this.account);


    this.settingsService.onSubmit(accountData).subscribe(
      result => {
        this.userService.getCurrentUser();
      },
      err => {},
      () => {}
    );

  }

}
