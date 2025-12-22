import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Movie {
  id?: number;
  title?: string;
  genres?: string[];

}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl: string = 'https://moviesapi.ir/api/v1/movies';

  constructor(public http: HttpClient) {
  }

  getMovieList(): Observable<Movie> {
    // return this.http.get(this.apiUrl).pipe(map((result: any) => result.data));
    return this.http.get(environment.baseUrl);
  }

  getMovie(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
   }

  createMovie(movie: Movie) {
    return this.http.post(this.apiUrl,movie);
   }

  updateMovie(movie: Movie) {
    return this.http.post(this.apiUrl + '/' + movie.id,movie);
   }

  deleteMovie(id: number) {
    this.http.delete(this.apiUrl + '/' + id).subscribe(result => {
      console.log(result);
    })
  }
}
