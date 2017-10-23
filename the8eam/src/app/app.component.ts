import { Component } from '@angular/core';
import { DataAccessLayerComponent } from './data-access-layer/data-access-layer.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  providers: [DataAccessLayerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  siteTitle = 'the8eam';
  calendar: Observable<any>;

  constructor(dal: DataAccessLayerComponent) {
    this.calendar = dal.getCalendar();
  }

}

