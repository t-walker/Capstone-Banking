import {Component, OnInit} from "@angular/core";
import { UserService } from '../../user/services/user.service';
import {SettingsService} from './settings.service';

@Component({
  templateUrl: "./app/settings/settings/settings.html",
  providers: [SettingsService]
})

export class SettingsComponent implements OnInit {
  private user: any = null;
  private accounts: any = null;

  private fname: string;
  private lname: string;
  private email: string;
  private old_password: string;
  private new_password: string;
  private confirm_password: string;
  private defaultAccount: any = null;
  private defaultAccountId: number;

  constructor(private userService: UserService, private settingsService: SettingsService) { }

  ngOnInit() {
    console.log("Settings component initialized ...");
    this.refreshAccounts();
  }

  submit() {
    let accountData = {};

    accountData['first_name'] = this.fname;
    accountData['last_name'] = this.lname;
    accountData['email'] = this.email;
    accountData['old_password'] = this.old_password;
    accountData['new_password'] = this.new_password;
    accountData['default_account'] = this.defaultAccount.id;

    this.settingsService.onSubmit(accountData).subscribe(
      result => {
        this.refreshAccounts();
      },
      err => {

      },
      () => {

      }
    );

  }

  refreshAccounts() {
    this.userService.grabUser();
    this.userService.user.subscribe(
      user => {
        this.user = user;
        this.fname = this.user['first_name'];
        this.lname = this.user['last_name'];
        this.email = this.user['email'];
        this.defaultAccountId = this.user['default_account'];

        this.userService.getAccounts().subscribe(
          data => {
            this.accounts = data.result;

            for (let account of this.accounts) {
              if (account.id == this.defaultAccountId) {
                this.defaultAccount = account;
              }
            }
          }
        );
      }
    );
  }
}
