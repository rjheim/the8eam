import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input()
  eventItem: Event;
  genres;
  showInfo : boolean;
  report: boolean;
  constructor() {
    this.showInfo = false;
    this.report = false;
    this.genres = [];
  }

  ngOnInit() {
    this.genres = this.eventItem.genre.split(';').map(function(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    this.genres = this.genres.slice(0, this.genres.length - 1); // remove tail element cause it's always empty
    console.log(this.genres);
  }

  toggleInfo(){
    this.showInfo = !this.showInfo;
  }
  toggleReport(event : boolean){
    this.report = event;
  }
}
