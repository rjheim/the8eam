import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventListDataComponent} from "./event-list-data/event-list-data.component";
import {EventCalendarDataComponent} from "./event-calendar-data/event-calendar-data.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";

const routes: Routes = [
  // List Route Paths in order of Most Specific to Least Specific
  {
    path: 'list-view',
    component: EventListDataComponent
  },
  {
    path: 'cal-view',
    component: EventCalendarDataComponent
  },
  { // Home Page
    path: '',
    redirectTo: '/list-view',
    pathMatch: 'full'
  },
  { // Page Not Found - 404
    path: '**',
    component: PagenotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing : true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
