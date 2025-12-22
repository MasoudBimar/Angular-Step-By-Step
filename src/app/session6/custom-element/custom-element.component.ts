import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss']
})
export class CustomElementComponent implements OnInit {

  @Input() desc!: string;
  inputs: any = { list: [1, 2, 3], name: 'items' };
  color= 'red';
  constructor() { }

  ngOnInit(): void {
  }

  addItem(e: any) {
    this.inputs.list.push('new input');
    // this.inputs = { list: [1, 2, 3, 4], name: 'new items' };
  }

}
