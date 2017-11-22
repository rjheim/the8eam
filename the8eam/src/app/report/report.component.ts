import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../data-access-layer/event';
import {DataAccessLayerComponent} from '../data-access-layer/data-access-layer.component';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-report',
  providers: [DataAccessLayerComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input()
  eventItem: Event;

  public visible = false;
  public visibleAnimate = false;

  constructor(private dal: DataAccessLayerComponent) {
    this.eventItem = {} as Event;
  }


  submitFeedback( id: string): void{
    //to implement
    this.eventItem.report++;
    this.dal.updateDoc(id, this.eventItem);
    this.hide();
  }

  /*
   Modal Methods
   */
  show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
    // jQuery("#reportModal").on(this.show(), function() {
    //   jQuery("body").addClass("no-scroll-on-modal");
    //   jQuery("html").addClass("no-scroll-on-modal");
    // });
  }

  hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
    // jQuery("#reportModal").on(this.show(), function() {
    //   jQuery("body").removeClass("no-scroll-on-modal");
    //   jQuery("html").removeClass("no-scroll-on-modal");
    // });
  }

  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  ngOnInit() {
  }

}
