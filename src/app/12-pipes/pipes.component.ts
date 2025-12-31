import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {
  employees = [
    { name: 'ava turner', state: 'California', salary: 82000 },
    { name: 'liam patel', state: 'Texas', salary: 73000 },
    { name: 'mia chen', state: 'New York', salary: 91000 },
    { name: 'noah brooks', state: 'Florida', salary: 68000 },
    { name: 'emma rivera', state: 'Washington', salary: 88000 }
  ];
}
