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
  list: Observable<any>;

  constructor(private dal: DataAccessLayerComponent) {
    this.calendar = dal.getCalendar();
    this.list = dal.getList();
  }

  removeData(key: string){
    this.dal.removeFromCalendar(key);
  }

  removeData2 (key: string) {
    this.dal.removeFromList(key);
  }
}

