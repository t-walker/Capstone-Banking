import {Component, OnInit} from "@angular/core";

@Component({
  selector: "page-footer",
  templateUrl: "./app/layout/footer/footer.html"
})

export class FooterComponent implements OnInit {
  ngOnInit() {
    console.log("Navbar component initialized ...");
  }
}
