import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-attribute-directives',
  templateUrl: './attribute-directives.component.html',
  styleUrls: ['./attribute-directives.component.scss']
})
export class AttributeDirectivesComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
