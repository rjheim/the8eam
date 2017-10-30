import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  view: boolean;

  constructor() {
    this.view = true;
  }
  toggleView() {
    this.view = true;
  }
  toggleView2() {
    this.view = false;

  }
}

