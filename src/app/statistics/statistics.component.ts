import { Component, OnInit } from '@angular/core';
import { RoundsService } from '../service/rounds.service';
import { Statistic } from '../model/statistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [RoundsService]
})
export class StatisticsComponent implements OnInit {

  statistic: Statistic;

  constructor(private roundsService: RoundsService) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.roundsService.getStatistics().subscribe(data => this.statistic = data);
  }
}
