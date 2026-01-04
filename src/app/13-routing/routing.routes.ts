import { Component1Component } from "./component1/component1.component";
import { Component2Component } from "./component2/component2.component";
import { Component3Component } from "./component3/component3.component";
import { Routes } from "@angular/router";

export const ROUTING_ROUTES: Routes = [
  { path: '', redirectTo: 'page1', pathMatch: 'full' },
  { path: 'page1', component: Component1Component },
  { path: 'page2', component: Component2Component },
  { path: 'page3', component: Component3Component },
]
