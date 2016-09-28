import {Component, View} from 'angular2/core';

@Component({
  selector: 'frontend'
})

@View({
  templateUrl: 'frontend.html'
})

export class Frontend {

  constructor() {
    console.info('Frontend Component Mounted Successfully');
  }

}
