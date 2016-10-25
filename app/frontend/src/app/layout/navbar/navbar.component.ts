import {Component, OnInit} from "@angular/core";

@Component({
  selector: "navbar",
  templateUrl: "./app/layout/navbar/navbar.html"
})

export class NavComponent implements OnInit {
  ngOnInit() {
    console.log("Navbar component initialized ...");
  }
}
