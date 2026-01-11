import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie, MovieService } from './movie.service';



@Component({
  selector: 'app-using-service',
  templateUrl: './using-service.component.html',
  styleUrls: ['./using-service.component.css']
})
export class UsingServiceComponent {
  title = 'AngularApp2';
  priceError = '';
  movies?: Observable<any>;
  movies2?: any[];
  movieForm: FormGroup;
  genres: string[] = ['drama', 'comedy', 'horror', 'Crime'];

  constructor(public movieService: MovieService, public fb: FormBuilder) {
    // this.movies = this.movieService.getMovieList();
    this.movieService.getMovieList('matrix').subscribe((result: any) => {
      console.log(result);
      let movieArray = Array.isArray(result) ? result : [result];
      this.movies2 = movieArray.map(x => ({ Id: x.imdbID, Title: x.Title, imdbRating: Math.round(+x.imdbRating), Genre: x.Genre }))
    });
    console.log('heeeeyyyyyyyy');
    this.movieForm = this.fb.group({
      id: [null, Validators.required],
      title: [null, [Validators.required, Validators.minLength(2)]],
      genres: [0, [Validators.required]]
    });
  }


  delete(id: number) {
    this.movieService.deleteMovie(id);
  }

  onSubmit() {
    this.movieService.createMovie(this.movieForm.value).subscribe((result: any) => {
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
    this.movieService.updateMovie(this.movieForm.value).subscribe((result: any) => {
      console.log(result);
    });
  }

  getOneMovie(id: number) {
    this.movieService.getMovie(id).subscribe((result: any) => {
      console.log(result);
    });
  }

}
