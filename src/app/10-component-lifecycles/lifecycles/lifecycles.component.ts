import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'app-lifecycles',
  templateUrl: './lifecycles.component.html',
  styleUrls: ['./lifecycles.component.scss']
})
export class LifecyclesComponent implements OnInit, OnDestroy, DoCheck, OnChanges {


  @Input() inputs!: any;


  ngOnInit(): void {
    console.log('onInit called');
  }

  ngOnDestroy(): void {
    console.log('onDestroy called');
  }
  ngDoCheck(): void {
    console.log('docheck called');

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.inputs, changes);
  }

}
