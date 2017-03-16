import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Headers, RequestOptions} from '@angular/http';

import { TransferUserComponent } from '../user/user.component';
import { TransferInternalComponent } from '../internal/internal.component';

import { UserService } from '../../user/services/user.service';


@Component({
  templateUrl: './app/transfer/transfer/transfer.html',
})

export class TransferComponent implements OnInit {

  private transferView = "user";

  constructor() {}

  ngOnInit() {
    console.log("Transfer component initialized ............");
  }

}
