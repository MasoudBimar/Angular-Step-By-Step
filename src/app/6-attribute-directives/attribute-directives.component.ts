import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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


