import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecyclesComponent } from './lifecycles/lifecycles.component';
import { CustomElementComponent } from './custom-element/custom-element.component';
import { DirectiveComponent } from './directive/directive.component';
import { HighlightDirective } from './directive/highlight.directive';
import { Highlight2Directive } from './directive/highlight2.directive';



@NgModule({
  declarations: [
    LifecyclesComponent,
    CustomElementComponent,
    DirectiveComponent,
    HighlightDirective,
    Highlight2Directive
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LifecyclesComponent,
    CustomElementComponent
  ]
})
export class Session6Module { }
