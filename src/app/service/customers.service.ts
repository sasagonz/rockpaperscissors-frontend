import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoundResult } from '../model/round-result';
import { Shape } from '../model/shape';
import { RoundRequest } from '../model/round-request';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersURL = 'http://localhost:8080/rockpaperscissors/customers';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public createCustomer() {
    return this
      .httpClient
      .post<string>(this.customersURL, null)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  public getRounds(customerId: string): Observable<RoundResult[]> {
    return this
      .httpClient
      .get<RoundResult[]>(`${this.customersURL}/${customerId}/rounds`)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  public play(customerId: string, player1: Shape, player2: Shape): Observable<RoundResult> {
    const roundRequest = new RoundRequest(player1, player2);
    return this
      .httpClient
      .post<RoundResult>(
        `${this.customersURL}/${customerId}/rounds`,
        JSON.stringify(roundRequest),
        this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  public reset(customerId: string): Observable<string> {
    return this
      .httpClient
      .delete<string>(`${this.customersURL}/${customerId}/rounds`)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

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
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

