import { Component, OnInit } from '@angular/core';
import { Round } from '../round';
import { RockPaperScissorsService } from '../rock-paper-scissors.service';
import { Shape } from '../shape';

@Component({
  selector: 'app-rounds-table',
  templateUrl: './rounds-table.component.html',
  styleUrls: ['./rounds-table.component.css'],
  providers: [RockPaperScissorsService]
})
export class RoundsTableComponent implements OnInit {

  rounds: Round[];

  constructor(private rockPaperScissorsService: RockPaperScissorsService) { }

  ngOnInit() {
    this.getRounds();
  }

  getRounds() {
    this.rockPaperScissorsService.getRounds().subscribe((data: Round[]) => {
      console.log(data);
      this.rounds = data;
    });
  }

  public play() {
    this.rockPaperScissorsService.play(Shape.Rock, this.randomShape()).subscribe(data => this.rounds.push(data));
  }

  public reset() {
    this.rockPaperScissorsService.reset().subscribe(() => this.rounds = []);
  }

  randomShape(): Shape {
    const values = Object.keys(Shape);
    const enumKey = values[Math.floor(Math.random()*values.length)];
    return Shape[enumKey];
  }
}
