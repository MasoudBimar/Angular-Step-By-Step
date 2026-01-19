import { Component } from '@angular/core';
import { PersianDatePipe } from '../12-pipes/pipes/persian-date.pipe';
import { CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, PercentPipe, UpperCasePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [PersianDatePipe, DecimalPipe, DatePipe, UpperCasePipe, CurrencyPipe, PercentPipe, JsonPipe],
  selector: 'app-angular-fundamentals',
  templateUrl: './angular-fundamentals.component.html',
  styleUrls: ['./angular-fundamentals.component.scss']
})
export class AngularFundamentalsComponent {
  title: string = 'Display data Using Interpolation';
  imgUrl1: string = 'data:image/png;base64,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';
  person: { [id: string]: string } = { firstName: 'Masoud', lastName: 'Bimmer' };
  imgUrl2: string = 'https://angular.io/assets/images/logos/angular/shield-large.svg';

  version = 17;

  name = "Sara";

  getGreeting(): string {
    return `Hello ${this.name}`;
  }

  price = 25;
  quantity = 3;
  firstName = "Ava";
  lastName = "Lee";
  isActive = true;

  createdAt = new Date(2024, 0, 15);
  amount = 1234.5;
  ratio = 0.835;
  colSpan = 2;

  dateObj: Date = new Date();
  numberValue: number = 123456789;

  sayHello(event: Event) {
    // event.stopPropagation();
    console.log('button => say hello ', event);
  }

  sayHello2(event: Event) {
    console.log('div => say hello ', event);
  }

  anchorClicked(event: MouseEvent) {
    // event.preventDefault();
    console.log('Anchor clicked');
  }

  keyUpHandler(event: KeyboardEvent) {

    console.log('keyUp Event Handler >>>', event);
    if (event.key === 'Enter') {
      console.log('Enter KeyUp Event Handler >>>', event);
    }
  }

  enterHandler(event: Event) {

    console.log('Enter Event Handler 1 >>>', event);
  }

  enterHandler2(value: any) {

  }

  enterHandler3(event: any) {
    console.log('Enter Event Handler 3 >>>', event?.target?.value);
  }

}
