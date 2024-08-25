import { Component, inject, OnInit } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { CustomModel } from '../models/custom.model';
import { Movie } from '../models/movie.model';

import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  movieService = inject(MoviesService);
  movies = toSignal(this.movieService.movies$, {
    initialValue: {} as CustomModel<Movie[]>,
  });

  ngOnInit(): void {}

  loadMore() {
    this.movieService.page.update((val) => val + 1);
  }
}
