import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { GettingStartedComponent } from './1-getting-started/getting-started.component';
import { ColorPickerComponent } from './11-decorators/color-picker/color-picker.component';
import { DecoratorsComponent } from './11-decorators/decorators.component';
import { PipesComponent } from './12-pipes/pipes.component';
import { AppendTextPipe } from './12-pipes/pipes/append-text.pipe';
import { LetterCountPipe } from './12-pipes/pipes/letter-count.pipe';
import { PersianDatePipe } from './12-pipes/pipes/persian-date.pipe';
import { SortNumberPipe } from './12-pipes/pipes/sort-number.pipe';
import { SumOfNumbersPipe } from './12-pipes/pipes/sum-of-numbers.pipe';
import { PostCollectionComponent } from './12-pipes/post-collection/post-collection.component';
import { Component1Component } from './13-routing/component1/component1.component';
import { Component2Component } from './13-routing/component2/component2.component';
import { Component3Component } from './13-routing/component3/component3.component';
import { RoutingComponent } from './13-routing/routing.component';
import { ServicesComponent } from './14-services/services.component';
import { TypescriptPreliminariesComponent } from './2-typescript-preliminaries/typescript-preliminaries.component';
import { AngularFundamentalsComponent } from './3-angular-fundamentals/angular-fundamentals.component';
import { CounterExampleComponent } from './3-angular-fundamentals/counter-example/counter-example.component';
import { ComponentsAndTemplatesComponent } from './4-components-and-templates/components-and-templates.component';
import { ToDoComponent } from './4-components-and-templates/todo-app/to-do/to-do.component';
import { StructuralDirectivesComponent } from './5-structural-directives/structural-directives.component';
import { AttributeDirectivesComponent } from './6-attribute-directives/attribute-directives.component';
import { ComponentDirectivesComponent } from './7-component-directives/component-directives.component';
import { CustomDirectivesComponent } from './8-custom-directives/custom-directives.component';
import { SpecialElementsComponent } from './9-special-elements/special-elements.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormModule } from './16-reactive-forms/session8.module';
import { JsonPipe } from '@angular/common';
import { LifecyclesComponent } from './10-component-lifecycles/lifecycles/lifecycles.component';
[]

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
    LifecyclesComponent,
    DecoratorsComponent,
    ColorPickerComponent,
    PipesComponent,
    AppendTextPipe,
    SortNumberPipe,
    LetterCountPipe,
    SumOfNumbersPipe,
    PostCollectionComponent,
    SidebarComponent,
    RoutingComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    ServicesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormModule,
    JsonPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
