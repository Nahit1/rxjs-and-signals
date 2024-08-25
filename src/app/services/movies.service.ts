import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomModel } from '../models/custom.model';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable, of, scan, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWIyYWVkZDdkMDg2NGU3ODY1NTYyOTM5MmFlOGRhMyIsIm5iZiI6MTcyNDQ0NDM0Ni41OTIwOTYsInN1YiI6IjYzOWRjZTE1YmU2ZDg4MDA4NGViMTE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fef2QDjsJRxRFON1UGQUvpgktufOxlDE6oikqSJRnbk';

  page$ = new BehaviorSubject(1);
  loading$ = new BehaviorSubject(false);
  movies$ = this.page$.pipe(
    tap(() => this.loading$.next(true)),
    switchMap((page) => {
      return this.httpClient.get<CustomModel<Movie[]>>(
        this.baseUrl + 'discover/movie?page=' + page,
        {
          headers: {
            Authorization: this.token,
            accept: 'application/json',
          },
        }
      );
    }),
    scan((acc, data) => {
      return {
        ...acc,
        page: data.page,
        results: [...acc.results, ...data.results],
      };
    }),
    tap(() => this.loading$.next(false))
  );

  private httpClient = inject(HttpClient);
}
