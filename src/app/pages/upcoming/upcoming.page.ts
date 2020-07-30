import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  events: any;
  has_loader: boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public loader: LoadingController
  ){
    this.has_loader = false;
    if(this.eventsService.events !== undefined){
      this.events = this.eventsService.events;
    }
    this.getEvents();
  }

  ngOnInit() {
  }

  refreshData(event){
    this.eventsService.getAllEventsDataFromApi().subscribe(
      data => {
        this.events = this.eventsService.events;
        event.target.complete();
      },
      error => {
        console.log(error);
        event.target.complete();
      },
      () => {
        event.target.complete();
      }
    );
  }

  getEvents(){
    if(this.eventsService.events === undefined){
      this.has_loader = true;
      this.loader.create({
        message: 'Loading Events.'
      }).then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
          console.log('Loading dismissed!');
        });
      });
    }
    this.eventsService.getAllEventsDataFromApi().subscribe(
      data => {
        if(this.has_loader){
          this.loader.dismiss();
        }
        this.events = this.eventsService.events;
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }

  // Sets the selected event id state and redirects the route to the special events page
  goToEvent(id){
    this.loader.create({
      message: 'Loading Event.'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.eventsService.getEventData(id).subscribe(
      data => {
        this.loader.dismiss();
        this.eventsService.setCurrentSelectedEvent(id);
        this.eventsService.setCurrentSelectedEventData(data);
        if(this.eventsService.current_selected_event_data.event_types == 1){
          this.router.navigate(['/special-event']);
        }else if(this.eventsService.current_selected_event_data.event_types == 3){
          this.router.navigate(['/learning-information']);
        }
        else{
          this.router.navigate(['/general-event']);
        }
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }

}
