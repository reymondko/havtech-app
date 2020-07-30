import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-general-event',
  templateUrl: './general-event.page.html',
  styleUrls: ['./general-event.page.scss'],
})
export class GeneralEventPage implements OnInit {
  event: any;
  checkcount:any;
  ongoing_schedule_idx:any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public browser: InAppBrowser
  ) {
    if (this.eventsService.current_selected_event_id === undefined) {
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    console.log(this.event);
  }

  ngOnInit() {
    this.ongoing_schedule_idx = this.checkCurrentEvent();
  }

  ionViewDidEnter(){
    this.refreshData();
  }

  refreshData(event = null){
    this.eventsService.getEventData(this.eventsService.current_selected_event_id).subscribe(
      data => {
        this.eventsService.setCurrentSelectedEventData(data);
        this.event = this.eventsService.current_selected_event_data;
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

  // Route to schedule page
  goToSchedule($schedule_id){
    this.eventsService.setCurrentSelectedEventScheduleId($schedule_id);
    this.router.navigate(['/sescheduledetail']);
  }

  // Route to right-now page
  goToRightNowSchedule($schedule_id){
    this.eventsService.setCurrentSelectedEventScheduleId($schedule_id);
    this.router.navigate(['/right-now-event']);
  }

  checkCurrentEvent(){
    let tmp_current_event_idx = null;
    let current_timestamp = new Date().getTime()/1000;
    let upcoming_index = null;
    let upcoming_index_diff = null;
    for(let x = 0;x<this.event.schedules.length;x++){
      let schedule_start =  new Date(this.formatDate(this.event.schedules[x].start_date)).getTime()/1000;
      let schedule_end =  new Date(this.formatDate(this.event.schedules[x].end_date)).getTime()/1000;

      if(schedule_start <= current_timestamp
        && schedule_end >= current_timestamp
      ){
        tmp_current_event_idx = x;
        break;
      }
      // Check upcoming event
      if(current_timestamp < schedule_start){
        if(upcoming_index_diff == null){
          upcoming_index_diff = schedule_start - current_timestamp;
          upcoming_index = x;
        }else{
          if((schedule_start - current_timestamp) < upcoming_index_diff){
            upcoming_index_diff = schedule_start - current_timestamp;
            upcoming_index = x;
          }
        }
      }
    }
    if(tmp_current_event_idx == null && upcoming_index < this.event.schedules.length){
      tmp_current_event_idx = upcoming_index;
    }
    return tmp_current_event_idx;
  }

  formatDate(date) {
    if(date != null){
      return date.replace(/\s/g, "T");
    }
    return false;
  }

  goToUrl(url){
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
        url = "http://" + url;
    }
    // Opening a URL and returning an InAppBrowserObject
    this.browser.create(url, '_system');
  }
  downloadFromUrl(filename){
    this.browser.create(filename, '_system');
  }


}
