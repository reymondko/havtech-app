import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sedining',
  templateUrl: './sedining.page.html',
  styleUrls: ['./sedining.page.scss'],
})
export class SEDiningPage implements OnInit {
  event:any;
  dinings:any;
  selected_dining:any; // Index of the selected dining object,
  selected_text: any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public browser: InAppBrowser,
    public helper: HelperService,
    public datePipe: DatePipe
  ) {
    if(this.eventsService.current_selected_event_id == undefined){
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    this.dinings =  this.event.grouped_dining;
    this.selected_text = 'Please Select From Dropdown';

    // if(this.dinings.length > 0){
    //   this.selected_dining = -1; // default to first object
    // }
    // console.log( this.selected_dining );
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
        this.dinings =  this.event.grouped_dining;
        // if(this.dinings.length > 0){
        //   this.selected_dining = 0; // default to first object
        // }
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

  selectDiningDate(){
    this.selected_text = this.datePipe.transform(this.formatDate(this.dinings[this.selected_dining].meal_date), 'EEEE, MMMM d, y')
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
}
