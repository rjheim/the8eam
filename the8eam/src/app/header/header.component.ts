import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterMenuDisplayed = false;
  constructor() {
    // called first time before the ngOnInit()

  }
  filterMenu() {
    this.filterMenuDisplayed = !this.filterMenuDisplayed;
  }
  ngOnInit() {
    // called after the constructor and called after the first ngOnChanges() call (which itself is called when input/output values change)
    // put all logic for this component in here
  }

}
