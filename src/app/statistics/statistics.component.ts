import { Component, OnInit } from '@angular/core';
import { RockPaperScissorsService } from '../rock-paper-scissors.service';
import { Statistic } from '../statistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  statistic: Statistic;

  constructor(private rockPaperScissorsService: RockPaperScissorsService) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.rockPaperScissorsService.getStatistics().subscribe(data => this.statistic = data);
  }
}
