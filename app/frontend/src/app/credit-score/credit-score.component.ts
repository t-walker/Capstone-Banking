import {Component} from "@angular/core";
import {OnInit} from "@angular/core";

import { UserService } from '../user/services/user.service';

@Component({
  templateUrl: './app/credit-score/credit-score.html',
  selector: 'credit-score'
})

export class CreditScoreComponent implements OnInit {

  public score = 0;
  public lowCredit = false;
  public midCredit = false;
  public highCredit = false;

  public currentClasses =  {
    "low": this.lowCredit,
    "mid": this.midCredit,
    "high":  this.highCredit
  };

  ngOnInit() {
    console.log("Credit component initialized ............");

    this.userService.getCreditScore()
    	.map(response => response)
    	.subscribe(
    		creditScore => {
    			console.log("HERE's some data");
    			this.score = creditScore['score'];
    		},
    		err => {
    			console.log("HERE's some err");
    			var score = this.getRandomInt(10, 100);
    			this.setScore(0, score, 1300 / score);

    			this.lowCredit = false;
    			this.midCredit = false;
    			this.highCredit = false;

    			if (score < 34) {
    				this.lowCredit = true;
    				console.log("low");
    			} else if (score < 67) {
    				this.midCredit = true;
    				console.log("mid");

    			} else {
    				this.highCredit = true;
    				console.log("high");

    			}
    		});
  }

  getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
	}

	setScore(score, max, tmout) {
		// for (var i = 0; i < score; i++){

		// 	this.timeout(i);
		// 	//this.score = i;
		// }


		console.log(score);
		var that = this;

		setTimeout(() => {
          //that.timeout();
          that.score = score;
          console.log(score);

          if (score <= max) {
          	that.setScore(score + 1 , max, tmout);
          }

          

      }, tmout);

	}


  constructor(private userService: UserService) { }

}
