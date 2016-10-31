i

mport {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {Layout} from './layout/layout';

@Component({
  selector: 'main'
})

@View({
  directives: [Layout],
  template: `<layout><navbar></navbar></layout>`
})

class Main {

}

bootstrap(Main);
