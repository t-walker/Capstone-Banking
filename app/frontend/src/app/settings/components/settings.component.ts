import {Component, OnInit} from "@angular/core";
import { UserService } from '../../user/services/user.service';

@Component({
  templateUrl: "./app/settings/components/settings.html"

})

export class SettingsComponent implements OnInit {

  private fname = "relyt";
  private lname = "zurc";
  private username = "tcruz";
  private password = "jellooo";
  private email = "t@email.com";
  private passwordShow = "***";
  private defaultDeposit = "Checking";

  private account: number;
  private accounts = [{id: 1, account_type: "Checking", total: 100}, {id: 2, account_type: "Savings", total: 500}];

  private editingName = false;
  private editingUsername = false;
  private editingPassword = false;
  private editingEmail = false;
  private editingDefaultDeposit = false;



  constructor(private userService: UserService) { }

  ngOnInit() {
    
    console.log("Settings component initialized ...");

    this.passwordShow = "";

    for (var i = 0; i < this.password.length; i++) {

        this.passwordShow += "*";
    }

  }


  onEdit(field) {

    switch (field) {
      case 'name':
        // code...
        this.editingName = true;
        break;
      case 'username':
        // code...
        this.editingUsername = true;

        break;
      case 'email':
        // code...
        this.editingEmail = true;

        break;
      case 'password':
        // code...
        this.editingPassword = true;

        break;
      case 'defaultDeposit':
      this.editingDefaultDeposit = true;

      
      default:
        // code...
        break;
    }
  }

  onCancel(field) { 

     switch (field) {
      case 'name':
        // code...
        this.editingName = false;
        break;
      case 'username':
        // code...
        this.editingUsername = false;

        break;
      case 'email':
        // code...
        this.editingEmail = false;

        break;
      case 'password':
        // code...
        this.editingPassword = false;

        break;
      
      case 'defaultDeposit':
        this.editingDefaultDeposit = false;
        break;
      default:
        // code...
        break;
    }

  }

  onSave(field) {

  }

  deactivate() {

    console.log("deactivate account");
  }

}
