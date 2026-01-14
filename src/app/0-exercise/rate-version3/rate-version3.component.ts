import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-rate-version3',
  templateUrl: './rate-version3.component.html',
  styleUrls: ['./rate-version3.component.scss']
})

export class RateVersion3Component implements OnInit {
  constructor() { }

  @Input() rateNumber: number = -1;
  @Input() arr: Array<any> = [1, 2, 3, 4, 5]
  @Output() rateSelected: EventEmitter<number> = new EventEmitter<number>();
  hoverTo: number = -1;

  handleClick = (number: number) => { this.rateNumber = number; this.rateSelected.emit(this.rateNumber) }

  handleHover = (number: number) => { console.log("In"); this.hoverTo = number }

  handleLeave = () => { this.hoverTo = -1 }

  ngOnInit(): void {
  }

}
