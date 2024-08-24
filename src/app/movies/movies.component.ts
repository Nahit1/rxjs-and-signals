import { Component, inject, OnInit } from '@angular/core';
import { MovieComponent } from './movie/movie.component';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  movieService = inject(MoviesService);
  movies$ = this.movieService.movies$;

  ngOnInit(): void {
    //this.movieService.getMovies().subscribe((x) => console.log(x));
  }

  loadMore() {
    this.movieService.page$.next(this.movieService.page$.getValue() + 1);
  }
}
