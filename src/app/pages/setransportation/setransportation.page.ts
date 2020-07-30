import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-setransportation',
  templateUrl: './setransportation.page.html',
  styleUrls: ['./setransportation.page.scss'],
})
export class SETransportationPage implements OnInit {
  event: any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public browser: InAppBrowser,
    public helper: HelperService
  ) {
    if (this.eventsService.current_selected_event_id === undefined) {
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
  }
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.refreshData();
  }
 
  goToUrl(url){
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
        url = "http://" + url;
    }
    // Opening a URL and returning an InAppBrowserObject
    this.browser.create(url, '_system');
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

}
