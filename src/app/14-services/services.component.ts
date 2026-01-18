import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  private readonly http = inject(HttpClient);
  readonly users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users/');

  constructor() { }

  trackByUserId(index: number, user: User) {
    return user.id;
  }
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { street: string, city: string, zipcode: string };
}
