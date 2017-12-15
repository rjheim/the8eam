import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { Event } from '../event';
import { Report } from '../report';
import {DataAccessLayerService} from '../data-access-layer.service';
declare var jquery :any;
declare var $ :any;

@Component({
  selector: 'app-report',
  encapsulation: ViewEncapsulation.None,
  providers: [DataAccessLayerService],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Output()
  reporting = new EventEmitter<boolean>();
  @Input()
  eventItem: Event;
  reportAdd: Report;
  showAlert1: boolean;
  showAlert2: boolean;
  showAlert3: boolean;
  reportSelected: string;
  email: string;
  description: string;
  reason: string[] = ['\<Select Reason\>','Inaccurate Information',
    'Inappropriate', 'Duplicate Item',
    'This isn\'t an Art Event'];

  public visible = false;
  public visibleAnimate = false;

  constructor(public dal: DataAccessLayerService) {
    this.eventItem = {} as Event;
    this.reportAdd = {} as Report;
    this.showAlert1 = false;
    this.showAlert2 = false;
    this.showAlert3 = false;
    this.reportSelected = '\<Select Reason\>';
    this.email = '';
    this.description = '';
  }
  ngOnInit(){
    this.show();
  }

  updateReason(s: string){
    this.reportSelected = s;
  }

  submitFeedback(): void {
    this.showAlert1 = false; this.showAlert2 = false; this.showAlert3 = false;
    const pureEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.eventItem.report++;
    this.reportAdd.id = this.eventItem.id;
    this.reportAdd.description = this.description;
    if (!this.description){
      this.showAlert2 = true;
    }
    this.reportAdd.email = this.email;
    if (!pureEmail.test(this.email) && this.email){
     this.showAlert3 = true;
    }
    this.reportAdd.reason = this.reportSelected;
    if (this.reportSelected === this.reason[0]){
      this.showAlert1 = true;
    }
    if (!this.showAlert3 && !this.showAlert2 && !this.showAlert1) {
      console.log(this.reportAdd);
      this.dal.updateDoc(this.eventItem.id, this.eventItem);
      this.dal.addToReport(this.reportAdd);
      this.hide();
    }
  }

  /*
   Modal Methods
   */
  show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.reporting.emit(false), 300);
    setTimeout(() => this.visible = false, 300);
    setTimeout(() => $('body').removeClass('noScrollForYou'), 50);
  }

  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
