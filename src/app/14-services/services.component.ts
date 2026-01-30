import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
    imports: [AsyncPipe, NgTemplateOutlet],
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  private jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com/users/';
  private readonly http = inject(HttpClient);
  readonly users$ = this.http.get<User[]>(this.jsonPlaceHolderUrl);

  trackByUserId(index: number, user: User) {
    return user.id;
  }

  edit(user: User) {
    this.http.patch(this.jsonPlaceHolderUrl + user.id, user).subscribe(result => console.log(result));
  }

  info(id: number) {
    console.log('User info requested for', id);
  }

  delete(id: number) {
    this.http.delete(this.jsonPlaceHolderUrl + id).subscribe(result => console.log(result));
  }
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { street: string, city: string, zipcode: string };
}
