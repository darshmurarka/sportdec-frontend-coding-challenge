import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public match_data: any;
  public match_winner: any;
  public match: any;
  constructor(public navCtrl: NavController,private http: Http) {
    this.http.get('assets/data/match_sample.json').map(res => res.json()).subscribe(data => {
      this.match_data = data;
      if (this.match_data.team_data[0].teamref == this.match_data.match_winner) {
        this.match_winner = this.match_data.team_data[0].name;
      }
      else {
        this.match_winner = this.match_data.team_data[1].name;
      }
      this.match = "Match Details"
      console.log(data)
    });
    console.log(this.match_data)
    
  }

}
