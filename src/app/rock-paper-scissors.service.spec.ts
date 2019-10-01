import { TestBed } from '@angular/core/testing';

import { RockPaperScissorsService } from './rock-paper-scissors.service';

describe('RockPaperScissorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RockPaperScissorsService = TestBed.get(RockPaperScissorsService);
    expect(service).toBeTruthy();
  });
});
