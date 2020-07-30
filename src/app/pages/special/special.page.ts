import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.page.html',
  styleUrls: ['./special.page.scss'],
})
export class SpecialPage implements OnInit {
  special_events: any;
  has_loader: boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public loader: LoadingController,
    public helper: HelperService
  ){
    this.has_loader = false;
    if(this.eventsService.special_events !== undefined){
      this.special_events = this.eventsService.special_events;
    }
    this.getSpecialEvents();
  }

  ngOnInit() {
  }

  // Get special events data and update the special events state
  getSpecialEvents(){
    if(this.eventsService.general_events === undefined){
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
    this.eventsService.getAllSpecialEventsDataFromApi().subscribe(
      data => {
        if(this.has_loader){
          this.loader.dismiss();
        }
        this.special_events = this.eventsService.special_events;
      },
      error => {
        if(this.has_loader){
          this.loader.dismiss();
        }
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
        this.router.navigate(['/special-event']);
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }
  
  refreshData(event){
    this.eventsService.getAllSpecialEventsDataFromApi().subscribe(
      data => {
        this.special_events = this.eventsService.special_events;
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
  
}
