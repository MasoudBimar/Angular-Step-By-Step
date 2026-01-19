import { Component } from '@angular/core';


@Component({
  standalone: true,
  imports: [],
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent {
  title: string = 'Welcome to Angular Step By Step!';

}
