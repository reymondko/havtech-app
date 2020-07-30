import { Component, OnInit, ViewChildren } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

import { PinchZoomComponent } from 'ngx-pinch-zoom';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  selected_map: any;
  event: any;
  somePinchZoom: PinchZoomComponent;
  zoomed: Boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
  ) {
    if (this.eventsService.current_map === undefined) {
      this.router.navigate(['/']);
    }

    if (this.eventsService.current_selected_event_id === undefined) {
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    this.selected_map = null;
    this.zoomed = false;
  }
  @ViewChildren(PinchZoomComponent) pinchZoomComponent;

  ngOnInit() {
    if(this.eventsService.current_map){
      this.selected_map = this.eventsService.current_map;
    }
  }

  ngAfterViewInit(){
    this.somePinchZoom = this.pinchZoomComponent.find(elem => elem.id === "pinchZoomArea");
  }

  zoomIn(){
    if(!this.zoomed){
      this.pinchZoomComponent.first.toggleZoom();
      this.zoomed = true;
    }
  }

  zoomOut(){
    if(this.zoomed){
      this.pinchZoomComponent.first.toggleZoom();
      this.zoomed = false;
    }
  }

}
