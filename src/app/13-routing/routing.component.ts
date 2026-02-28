
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RouterOutlet],
    selector: 'app-routing',
    templateUrl: './routing.component.html',
    styleUrls: ['./routing.component.scss']
})
export class RoutingComponent {

}


