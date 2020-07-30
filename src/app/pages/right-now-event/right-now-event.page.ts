import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-now-event',
  templateUrl: './right-now-event.page.html',
  styleUrls: ['./right-now-event.page.scss'],
})
export class RightNowEventPage implements OnInit {

  event:any;
  schedule:any;
  constructor(
    public eventsService: EventsService,
    public router: Router
  ) {
    if(this.eventsService.current_selected_event_id == undefined){
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    for(let x = 0;x<this.event.schedules.length;x++){
      if(this.event.schedules[x].id == this.eventsService.current_selected_event_schedule_id){
        this.schedule = this.event.schedules[x];
        break;
      }
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.refreshData();
  }
  
  refreshData(event = null){
    this.eventsService.getEventData(this.eventsService.current_selected_event_id).subscribe(
      data => {
        this.eventsService.setCurrentSelectedEventData(data);
        this.event = this.eventsService.current_selected_event_data;
        for(let x = 0;x<this.event.schedules.length;x++){
          if(this.event.schedules[x].id == this.eventsService.current_selected_event_schedule_id){
            this.schedule = this.event.schedules[x];
            break;
          }
        }
        if(event){
          event.target.complete();
        }
      },
      error => {
        console.log(error);
        if(event){
          event.target.complete();
        }
      },
      () => {
        if(event){
          event.target.complete();
        }
      }
    );
  }

  formatDate(date) {
    if(date != null){
      return date.replace(/\s/g, "T");
    }
    return false;
  }

}
