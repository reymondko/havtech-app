import { Component, OnInit, Input } from '@angular/core';

import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-footer',
  templateUrl: './event-footer.component.html',
  styleUrls: ['./event-footer.component.scss'],
})
export class EventFooterComponent implements OnInit {
  @Input() host: any;
  event: any;
  constructor(
    public e:EventsService
  ) { 
  }

  ngOnInit() {}

}
