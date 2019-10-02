import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Statistic } from '../model/statistic';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoundsService {

  roundsURL = 'http://localhost:8080/rockpaperscissors/rounds/statistics';

  constructor(private httpClient: HttpClient) { }

  public getStatistics(): Observable<Statistic> {
    return this
      .httpClient
      .get<Statistic>(this.roundsURL)
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
