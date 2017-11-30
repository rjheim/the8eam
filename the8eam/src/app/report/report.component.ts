import { Component, Input } from '@angular/core';
import { Event } from '../event';
import { Report } from '../report';
import {DataAccessLayerService} from '../data-access-layer.service';

@Component({
  selector: 'app-report',
  providers: [DataAccessLayerService],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @Input()
  eventItem: Event;
  reportAdd: Report;
  email: string;
  description: string;
  reasNum: number;
  reason: string[] = ['Inaccurate Information',
    'Inappropriate', 'Duplicate Item',
    'This isn\'t an Art Event'];

  public visible = false;
  public visibleAnimate = false;

  constructor(public dal: DataAccessLayerService) {
    this.eventItem = {} as Event;
    this.reportAdd = {} as Report;
    this.reasNum = 0;
    this.email = '';
    this.description = '';
  }


  submitFeedback(id: string): void {
    //to implement
    this.eventItem.report++;
    this.reportAdd.id = this.eventItem.id;
    this.reportAdd.description = this.description;
    this.reportAdd.email = this.email;
    // reason doesn't work rn
    this.reportAdd.reason = this.reason[this.reasNum];
    console.log(this.reportAdd);
    this.dal.updateDoc(id, this.eventItem);
    this.dal.addToReport(this.reportAdd);
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
}
