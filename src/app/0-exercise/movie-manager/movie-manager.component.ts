
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie, MovieResult, MovieService } from './movie.service';
import { RateVersion2Component } from '../rate-panel/rate-version2/rate-version2.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RateVersion2Component],
  selector: 'app-movie-manager',
  templateUrl: './movie-manager.component.html',
  styleUrls: ['./movie-manager.component.scss']
})
export class MovieManagerComponent {
  private readonly movieService = inject(MovieService);
  private readonly fb = inject(FormBuilder);

  title = 'AngularApp2';
  priceError = '';
  movies2: Movie[] = [];
  movieForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
    title: [null, [Validators.required, Validators.minLength(2)]],
    genres: [0, [Validators.required]]
  });
  genres: string[] = ['drama', 'comedy', 'horror', 'Crime'];

  constructor() {
    this.movieService.getMovieList('matrix').subscribe((result: MovieResult) => {
      const movieArray = Array.isArray(result) ? result : [result];
      this.movies2 = movieArray.map(movie => ({
        imdbID: movie.imdbID,
        Title: movie.Title ?? '',
        imdbRating: Math.round(Number(movie.imdbRating ?? 0)),
        Genre: movie.Genre ?? ''
      }));
    });
  }


  delete(id: number | string) {
    this.movieService.deleteMovie(id);
  }

  onSubmit() {
    this.movieService.createMovie(this.movieForm.value).subscribe((result: Movie) => {
      console.log(result);
    });
  }

  reset() {
    this.movieForm.reset();
  }

  prepareForEdit(movie: Movie) {
    this.movieForm.patchValue({ title: movie.Title, genres: movie.Genre, id: movie.imdbID });
  }

  update() {
    this.movieService.updateMovie(this.movieForm.value).subscribe((result: Movie) => {
      console.log(result);
    });
  }

  getOneMovie(id: number | string) {
    this.movieService.getMovie(id).subscribe((result: Movie) => {
      console.log(result);
    });
  }
}
