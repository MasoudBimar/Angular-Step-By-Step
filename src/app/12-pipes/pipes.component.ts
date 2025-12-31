import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent {
  employees = [
    { name: 'Ava Turner', state: 'California', salary: 82000 },
    { name: 'Liam Patel', state: 'Texas', salary: 73000 },
    { name: 'Mia Chen', state: 'New York', salary: 91000 },
    { name: 'Noah Brooks', state: 'Florida', salary: 68000 },
    { name: 'Emma Rivera', state: 'Washington', salary: 88000 }
  ];
}
