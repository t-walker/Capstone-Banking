import {Component, View} from 'angular2/core';

@Component({
  selector: 'layout'
})

@View({
  templateUrl: 'layout/layout.html'
})

export class Layout {

  constructor() {
    console.info('Layout Component Mounted Successfully');
  }

}
