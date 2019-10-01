import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Round } from './round';
import { Shape } from './shape';
import { Game } from './game';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RockPaperScissorsService {

  apiURL = 'http://localhost:8080/rockpaperscissors';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getRounds() {
    return this.httpClient.get<Round[]>(`${this.apiURL}/customers/1/rounds`);
  }

  public play(player1: Shape, player2: Shape): Observable<Round> {
    const game = new Game(player1, player2);
    return this
      .httpClient
      .post<Round>(
        `${this.apiURL}/customers/1/rounds`,
        JSON.stringify(game),
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  public reset() {
    this.httpClient.delete(`${this.apiURL}/customers/1/rounds`);
  }

  // Error handling
  handleError(error:
    {
      error: {
        message: string;
      };
      status: any;
      message: any;
    }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

