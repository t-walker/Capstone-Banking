import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app/app.html"
})

export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}

@Component({
    selector: "navbar",
    templateUrl: "./app/layout/navbar.html"
})

export class NavComponent implements OnInit {
    ngOnInit() {
        console.log("Navbar component initialized ...");
    }
}

@Component({
    selector: "page-footer",
    templateUrl: "./app/layout/footer.html"
})

export class FooterComponent implements OnInit {
    ngOnInit() {
        console.log("Navbar component initialized ...");
    }
}
