import {Component, OnInit} from "@angular/core";
import { LocalStorageService } from 'angular-2-local-storage';
import {UserService} from "./user/services/user.service";

@Component({
  selector: "app",
  templateUrl: "./app/app.html",
})

export class AppComponent implements OnInit {
  constructor(private localStorage: LocalStorageService, private userService: UserService) {
  }

  ngOnInit() {
    console.log("Application component initialized ...");
  }
}
