import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Movie {
  imdbID: string | number;
  Title?: string;
  Year?: string;
  Genre?: string;
  imdbRating: number;
}

export type MovieResult = Movie | Movie[];


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);


  getMovieList(title?: string, year?: number, plot: 'short' | 'full' = 'short', response: 'json' | 'xml' = 'json'): Observable<MovieResult> {
    // return this.http.get(this.apiUrl).pipe(map((result: any) => result.data));
    let httpParam = new HttpParams();
    if (title) {
      httpParam = httpParam.set('t', title);
    }
    if (year) {
      httpParam = httpParam.set('y', year);
    }
    httpParam = httpParam.set('p', plot);
    httpParam = httpParam.set('r', response);
    if (environment.apiKey) {
      httpParam = httpParam.set('apikey', environment.apiKey);
    }
    return this.http.get<MovieResult>(environment.movieAPI, { params: httpParam });
  }

  getMovie(id: number | string) {
    return this.http.get<Movie>(environment.movieAPI + '/' + id);
  }

  createMovie(movie: Movie) {
    return this.http.post<Movie>(environment.movieAPI, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.post<Movie>(environment.movieAPI + '/' + movie.imdbID, movie);
  }

  deleteMovie(id: number | string) {
    this.http.delete(environment.movieAPI + '/' + id).subscribe(result => {
      console.log(result);
    })
  }
}
