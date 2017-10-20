import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RssComponent } from './rss/rss.component';
import { DataAccessLayerComponent } from './data-access-layer/data-access-layer.component';
import { EventListDataComponent } from './event-list-data/event-list-data.component';
import { EventCalendarDataComponent } from './event-calendar-data/event-calendar-data.component';
import { HeaderComponent } from './header/header.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { SearchComponent } from './search/search.component';
import { ReportComponent } from './report/report.component';

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
    ReportComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
