import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RssComponent } from './rss/rss.component';
import { DataAccessLayerComponent } from './data-access-layer/data-access-layer.component';
import { EventListDataComponent } from './event-list-data/event-list-data.component';
import { EventCalendarDataComponent } from './event-calendar-data/event-calendar-data.component';
import { HeaderComponent } from './header/header.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';
import { EventComponent } from './event/event.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCeUy-zn0nsS3yp0LS5x0hp8IU0V-9Gs-U",
  authDomain: "the-8-eam.firebaseapp.com",
  databaseURL: "https://the-8-eam.firebaseio.com",
  projectId: "the-8-eam",
  storageBucket: "the-8-eam.appspot.com",
  messagingSenderId: "764116037234"
};

@NgModule({
  declarations: [
    AppComponent,
    RssComponent,
    DataAccessLayerComponent,
    EventListDataComponent,
    EventCalendarDataComponent,
    HeaderComponent,
    OptionsMenuComponent,
    SearchComponent,
    ReportComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
