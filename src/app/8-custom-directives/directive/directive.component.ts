import { Component, OnInit } from '@angular/core';


@Component({
    imports: [],
    selector: 'app-directive',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {


  ngOnInit(): void {
    console.log('Just for demonstration')
  }

}
