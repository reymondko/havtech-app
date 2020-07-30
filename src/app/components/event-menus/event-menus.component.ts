import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-event-menus',
  templateUrl: './event-menus.component.html',
  styleUrls: ['./event-menus.component.scss'],
})
export class EventMenusComponent implements OnInit {
  @Input() event:any;
  constructor(
  ){
    
  }
  ngOnInit() {
  }

}
