import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-tabs',
  templateUrl: './event-tabs.component.html',
  styleUrls: ['./event-tabs.component.scss'],
})
export class EventTabsComponent implements OnInit {
  @Input() event:any;
  constructor(
    public router: Router
  ){
    console.log(this.router.url);
  }

  ngOnInit() {}

  isCurrentTab(){
    
  }

}
