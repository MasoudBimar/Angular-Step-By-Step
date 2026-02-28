import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    selector: 'app-lazy-loading',
    templateUrl: './lazy-loading.component.html',
    styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent {

}


