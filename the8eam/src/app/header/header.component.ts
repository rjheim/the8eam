import { Component, OnInit } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showFilters = false;
  words: string;
  constructor(public filter: FilterVarsService) {
    this.words = '';
    // called first time before the ngOnInit()

  }
  filterMenu() {
    this.showFilters = !this.showFilters;
  }
  ngOnInit() {
    // called after the constructor and called after the first ngOnChanges() call (which itself is called when input/output values change)
    // put all logic for this component in here
    $('.has-clear input[type="text"]').on('input propertychange', function() {
      var $this = $(this);
      var visible = Boolean($this.val());
      $this.siblings('.form-control-clear').toggleClass('hide-close', !visible);
    }).trigger('propertychange');

    $('.form-control-clear').click(function() {
      $(this).siblings('input[type="text"]').val('')
        .trigger('propertychange').focus();
    });
  }



}
