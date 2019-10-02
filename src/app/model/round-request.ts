import { Shape } from './shape';

export class RoundRequest {
    player1: Shape;
    player2: Shape;
    constructor(player1: Shape, player2: Shape) {
        this.player1 = player1;
        this.player2 = player2;
    }
}
