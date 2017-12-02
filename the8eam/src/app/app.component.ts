import { Component, OnInit } from '@angular/core';
import { RssService} from "./rss.service";

@Component({
  selector: 'app-root',
  providers: [RssService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  view: boolean;
  rss: RssService;

  constructor(rss : RssService) {
    this.rss = rss;
    this.view = true;
  }
  toggleView() {
    this.view = true;
  }
  toggleView2() {
    this.view = false;
  }

  ngOnInit(){
    this.rss.testRSS();
  }
}

