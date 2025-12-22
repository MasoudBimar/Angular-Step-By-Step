import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularStepByStep';

  persons = [{
    fn: 'Ali',
    ln: 'Hasani',
    dsc: 'Engeenire Man',
    img: '#'
  },
  {
    fn: 'Mohsen',
    ln: 'karami',
    dsc: 'Arch Man',
    img: '#'
  }];
  counter = 1;
  person = {
    fn: 'Mohsen',
    ln: 'karami',
    dsc: 'Arch Man',
    img: '#'
  }

  currentDate = new Date();

  constructor() {

  }

  sbdTell(event: any) {
    console.log('sobebody tell something', event);
  }

  addNewPerson() {
    let p = { fn: 'xxx', ln: 'xxxx', dsc: 'Engeenire Man', img: '#' };
    this.persons.push(p);
  }

  changePerson() {
    this.person = { fn: 'Ali', ln: 'Hasani', dsc: 'Engeenire Man', img: '#' };
    // this.person.fn = 'mohammad';

  }

  incCounter() {
    this.counter++;
  }

  // title = 'rating';
  rate = 4;
  handleRate(rate: number) {
    this.rate = rate;
  }

  rateSelected(event: any) {
    console.log(event);
  }

}
