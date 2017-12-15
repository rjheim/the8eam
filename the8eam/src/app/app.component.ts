import {Component , OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

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

  ngOnInit(){
    // This script sets the correct height of the body to make up for the sticky header
    (function(){
        function setBody(){
          let headerH = document.getElementById("app-header").scrollHeight;
          document.getElementById("main-view").style.marginTop = headerH + 'px';
        };
        setTimeout(setBody, 100);
        document.addEventListener('click', setBody);
        document.addEventListener('scroll', setBody);
    })();
  }
}

