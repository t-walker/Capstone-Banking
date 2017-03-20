import {Component, OnInit} from "@angular/core";
import { UserService } from '../../user/services/user.service';

@Component({
  templateUrl: "./app/settings/components/settings.html"

})

export class SettingsComponent implements OnInit {

  private fname = "relyt";
  private lname = "zurc";
  private username = "tcruz";
  private password = "jello";

  constructor(private userService: UserService) { }

  ngOnInit() {
    
    console.log("Settings component initialized ...");
  }


  onEdit() {

    console.log("hi");
  }

  deactivate() {

    console.log("deactivate account");
  }

}
