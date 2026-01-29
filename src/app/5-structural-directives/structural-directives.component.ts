import { Component, Input } from '@angular/core';

export class Person {
  public fn!: string;
  public ln!: string;
  public img!: string;
  public dsc!: string;
}


@Component({
  standalone: true,
  imports: [],
  selector: 'app-structural-directives',
  templateUrl: './structural-directives.component.html',
  styleUrls: ['./structural-directives.component.scss']
})
export class StructuralDirectivesComponent {
  @Input() personList: Person[] = [
    { fn: 'Ali', ln: 'Hasani', dsc: 'Engineer Man', img: 'https://angular.io/assets/images/logos/angular/shield-large.svg' },
    { fn: 'Mohsen', ln: 'karami', dsc: 'Arch Man', img: 'https://angular.io/assets/images/logos/angular/shield-large.svg' }
  ];

  tellWhoIAm(event: Person) {
    console.log('curr', event);
    // this.raiseEvent.emit(event);
  }
}
