import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Person } from './person';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  // public person: Person = {firstName: 'ali', lastName: 'karimi'};
  // @Input() firstName: string = 'someone';
  // @Input()  lastName: string = 'someone';
  // @Input()  desc: string = 'someone';
  // @Input()  imgUrl: string = '';


  // tslint:disable-next-line:no-input-rename
  @Input('persons') personList: Person[] = [{ fn: 'Ali', ln: 'Hasani', dsc: 'Engeenire Man', img: 'https://angular.io/assets/images/logos/angular/shield-large.svg' },
  { fn: 'Mohsen', ln: 'karami', dsc: 'Arch Man', img: 'https://angular.io/assets/images/logos/angular/shield-large.svg' }];
  counter = 1;
  // tslint:disable-next-line:no-output-rename
  @Output('tell') raiseEvent = new EventEmitter();
  currentPerson!: Person;


  constructor() { }

  ngOnInit(): void {
  }

  tellWhoIAm(event: any) {
    console.log('curr', event);
    this.raiseEvent.emit(event);
  }

}
