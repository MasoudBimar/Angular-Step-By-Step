import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Movie {
  id?: number;
  Title?: string;
  Year?: string;
  Genre?: string;

}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(public http: HttpClient) {
  }

  getMovieList(title: string, year?: number, plot: 'short' | 'full' = 'short', response: 'json' | 'xml' = 'json'): Observable<Movie> {
    // return this.http.get(this.apiUrl).pipe(map((result: any) => result.data));
    const httpParam = new HttpParams()
      .append('t', title)
      // .append('y', year)
      .append('p', plot)
      .append('r', response)
      .append('apikey', environment.apiKey);
    console.log(httpParam);
    return this.http.get(environment.movieAPI, { params: httpParam });
  }

  getMovie(id: number) {
    return this.http.get(environment.movieAPI + '/' + id);
  }

  createMovie(movie: Movie) {
    return this.http.post(environment.movieAPI, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.post(environment.movieAPI + '/' + movie.id, movie);
  }

  deleteMovie(id: number) {
    this.http.delete(environment.movieAPI + '/' + id).subscribe(result => {
      console.log(result);
    })
  }
}
