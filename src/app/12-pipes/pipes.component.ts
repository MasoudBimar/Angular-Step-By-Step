import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {
  employees = [
    { name: 'ava turner', state: 'California', salary: 82000, issueDate: new Date() },
    { name: 'liam patel', state: 'Texas', salary: 73000, issueDate: new Date() },
    { name: 'mia chen', state: 'New York', salary: 91000, issueDate: new Date() },
    { name: 'noah brooks', state: 'Florida', salary: 68000, issueDate: new Date() },
    { name: 'emma rivera', state: 'Washington', salary: 88000, issueDate: new Date() }
  ];
}
