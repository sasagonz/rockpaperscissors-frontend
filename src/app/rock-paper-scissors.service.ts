import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Round } from './round';
import { Shape } from './shape';
import { Game } from './game';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Statistic } from './statistic';

@Injectable({
  providedIn: 'root'
})
export class RockPaperScissorsService {

  customersURL = 'http://localhost:8080/rockpaperscissors/customers';
  statisticsURL = 'http://localhost:8080/rockpaperscissors/rounds/statistics';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public createCustomer() {
    return this.httpClient.post<string>(this.customersURL, null);
  }

  public getStatistics() {
    return this.httpClient.get<Statistic>(this.statisticsURL);
  }

  public getRounds(customerId: string) {
    return this.httpClient.get<Round[]>(`${this.customersURL}/${customerId}/rounds`);
  }

  public play(customerId: string, player1: Shape, player2: Shape): Observable<Round> {
    const game = new Game(player1, player2);
    return this
      .httpClient
      .post<Round>(
        `${this.customersURL}/${customerId}/rounds`,
        JSON.stringify(game),
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  public reset(customerId: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.customersURL}/${customerId}/rounds`);
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

