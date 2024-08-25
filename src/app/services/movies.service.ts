import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CustomModel } from '../models/custom.model';
import { Movie } from '../models/movie.model';
import { scan, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWIyYWVkZDdkMDg2NGU3ODY1NTYyOTM5MmFlOGRhMyIsIm5iZiI6MTcyNDQ0NDM0Ni41OTIwOTYsInN1YiI6IjYzOWRjZTE1YmU2ZDg4MDA4NGViMTE1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fef2QDjsJRxRFON1UGQUvpgktufOxlDE6oikqSJRnbk';

  page = signal(1);
  loading = signal(false);
  movies$ = toObservable(this.page).pipe(
    tap(() => this.loading.set(true)),
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
    tap(() => this.loading.set(false))
  );

  private httpClient = inject(HttpClient);
}
