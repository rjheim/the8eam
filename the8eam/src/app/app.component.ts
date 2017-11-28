import { Component } from '@angular/core';
import { RssComponent} from "./rss/rss.component";

@Component({
  selector: 'app-root',
  providers: [RssComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  view: boolean;
  rss: RssComponent;

  constructor(rss = new RssComponent()) {
    this.view = true;
  }
  toggleView() {
    this.view = true;
  }
  toggleView2() {
    this.view = false;
  }

  doButton(){
    this.rss.testRSS();
  }
}

