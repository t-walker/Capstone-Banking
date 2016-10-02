import {Component, View} from 'angular2/core';

@Component({
  selector: 'navbar'
})

@View({
  templateUrl: 'navbar/navbar.html'
})

export class Navbar {

  constructor() {
    console.info('Navbar Component Mounted Successfully');
  }

}
