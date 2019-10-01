import { Component, OnInit } from '@angular/core';
import { Round } from '../round';
import { RockPaperScissorsService } from '../rock-paper-scissors.service';
import { Shape } from '../shape';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  providers: [RockPaperScissorsService]
})
export class RoundsTableComponent implements OnInit {

  rounds: Round[];
  customerId: string;

  constructor(private cookieService: CookieService, private rockPaperScissorsService: RockPaperScissorsService) { }

  ngOnInit() {
    if (!this.cookieService.check('customerId')) {
      this.rockPaperScissorsService.createCustomer().subscribe(customerId => {
        this.cookieService.set('customerId', customerId);
        this.customerId = this.cookieService.get('customerId');
        this.getRounds();
      });
    } else {
      this.customerId = this.cookieService.get('customerId');
      this.getRounds();
    }
  }

  getRounds() {
    this.rockPaperScissorsService.getRounds(this.customerId).subscribe((data: Round[]) => {
      console.log(data);
      this.rounds = data;
    });
  }

  public play() {
    this.rockPaperScissorsService.play(this.customerId, Shape.Rock, this.randomShape()).subscribe(data => this.rounds.push(data));
  }

  public reset() {
    this.rockPaperScissorsService.reset(this.customerId).subscribe(() => this.rounds = []);
  }

  randomShape(): Shape {
    const values = Object.keys(Shape);
    const enumKey = values[Math.floor(Math.random()*values.length)];
    return Shape[enumKey];
  }
}
