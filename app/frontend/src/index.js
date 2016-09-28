import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Frontend} from 'frontend';

@Component({
  selector: 'main'
})

@View({
  directives: [Frontend],
  template: `
    <frontend></frontend>
  `
})

class Main {

}

bootstrap(Main);
