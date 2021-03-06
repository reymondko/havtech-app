import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.page.html',
  styleUrls: ['./myevents.page.scss'],
})
export class MyeventsPage implements OnInit {

  my_events: any;
  has_loader: boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public loader: LoadingController,
    public helper: HelperService
  ){
    this.has_loader = false;
    if(this.eventsService.my_events !== undefined){
      this.my_events = this.eventsService.my_events;
    }
    this.getMyEvents();
  }
  
  // Get special events data and update the special events state
  getMyEvents(){
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
    
    this.eventsService.getAllmyEventsDataFromApi().subscribe(
      data => {
        if(this.has_loader){
          this.loader.dismiss();
        }
        this.my_events = this.eventsService.my_events;
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
  goToEvent(id,type){
    console.log(type+" - "+id);

    this.loader.create({
      message: 'Loading Event.'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    if(type=="2")
    {
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
    else if(type=="3"){
      this.eventsService.getEventData(id).subscribe(
        data => {
          this.loader.dismiss();
          this.eventsService.setCurrentSelectedEvent(id);
          this.eventsService.setCurrentSelectedEventData(data);
          this.router.navigate(['/learning-information']);
        },
        error => {
          console.log(error);
        },
        () => {}
      );

    }
    else{
      this.eventsService.getEventData(id).subscribe(
      data => {
        this.loader.dismiss();
        this.eventsService.setCurrentSelectedEvent(id);
        this.eventsService.setCurrentSelectedEventData(data);
        this.router.navigate(['/general-event']);
      },
      error => {
        console.log(error);
      },
      () => {}
    );

    }
  }
  
  refreshData(event){
    this.eventsService.getAllmyEventsDataFromApi().subscribe(
      data => {
        this.my_events = this.eventsService.my_events;
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
  ngOnInit() {
  }
}
