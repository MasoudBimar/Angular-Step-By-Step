import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { GettingStartedComponent } from './1-getting-started/getting-started.component';
import { TypescriptPreliminariesComponent } from './2-typescript-preliminaries/typescript-preliminaries.component';
import { AngularFundamentalsComponent } from './3-angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3-angular-fundamentals/counter-example/counter-example.component';
import { ComponentsAndTemplatesComponent } from './4-components-and-templates/components-and-templates.component';
import { ToDoComponent } from './4-components-and-templates/todo-app/to-do/to-do.component';
import { StructuralDirectivesComponent } from './5-structural-directives/structural-directives.component';
import { AttributeDirectivesComponent } from './6-attribute-directives/attribute-directives.component';
import { ComponentDirectivesComponent } from './7-component-directives/component-directives.component';
import { CustomDirectivesComponent } from './8-custom-directives/custom-directives.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Session6Module } from './session6/session6.module';
import { Session8Module } from './session8/session8.module';
import { PersianDatePipe } from './12-pipes/pipes/persian-date.pipe';
import { SpecialElementsComponent } from './9-special-elements/special-elements.component';
import { ComponentLifecyclesComponent } from './10-component-lifecycles/component-lifecycles.component';
import { DecoratorsComponent } from './11-decorators/decorators.component';
import { ColorPickerComponent } from './11-decorators/color-picker/color-picker.component';
import { PipesComponent } from './12-pipes/pipes.component';
import { AppendTextPipe } from './12-pipes/pipes/append-text.pipe';
import { SortNumberPipe } from './12-pipes/pipes/sort-number.pipe';
import { LetterCountPipe } from './12-pipes/pipes/letter-count.pipe';
import { SumOfNumbersPipe } from './12-pipes/pipes/sum-of-numbers.pipe';
import { PostCollectionComponent } from './12-pipes/post-collection/post-collection.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RoutingComponent } from './routing/routing.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    TypescriptPreliminariesComponent,
    AngularFundamentalsComponent,
    CounterExampleComponent,
    PersianDatePipe,
    ToDoComponent,
    StructuralDirectivesComponent,
    AttributeDirectivesComponent,
    CustomDirectivesComponent,
    ComponentsAndTemplatesComponent,
    ComponentDirectivesComponent,
    SpecialElementsComponent,
    ComponentLifecyclesComponent,
    DecoratorsComponent,
    ColorPickerComponent,
    PipesComponent,
    AppendTextPipe,
    SortNumberPipe,
    LetterCountPipe,
    SumOfNumbersPipe,
    PostCollectionComponent,
    SidebarComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Session6Module,
    Session8Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
