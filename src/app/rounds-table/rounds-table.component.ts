import { Component, OnInit } from '@angular/core';
import { RoundResult } from '../model/round-result';
import { CustomersService } from '../service/customers.service';
import { Shape } from '../model/shape';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  providers: [CustomersService]
})
export class RoundsTableComponent implements OnInit {

  roundResults: RoundResult[];
  customerId: string;

  constructor(private cookieService: CookieService, private customersService: CustomersService) { }

  ngOnInit() {
    if (!this.cookieService.check('customerId')) {
      this.customersService.createCustomer().subscribe(customerId => {
        this.cookieService.set('customerId', customerId);
        this.getCookieAndGetRounds();
      });
    } else {
      this.getCookieAndGetRounds();
    }
  }

  getCookieAndGetRounds() {
    this.customerId = this.cookieService.get('customerId');
    this.getRounds();
  }

  getRounds() {
    this
      .customersService
      .getRounds(this.customerId)
      .subscribe((data: RoundResult[]) => {
        console.log(data);
        this.roundResults = data;
      });
  }

  public play() {
    this
      .customersService
      .play(this.customerId, Shape.Rock, this.randomShape())
      .subscribe(data => this.roundResults.push(data));
  }

  public reset() {
    this
      .customersService
      .reset(this.customerId)
      .subscribe(() => this.roundResults = []);
  }

  randomShape(): Shape {
    const values = Object.keys(Shape);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return Shape[enumKey];
  }
}
