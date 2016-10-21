import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

@Component({
    templateUrl: './app/home/components/home.html'
})

export class HomeComponent implements OnInit {

    ngOnInit() {
      console.log("Home component initialized ...");
    }
}
