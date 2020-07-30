import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {

  learning_informations: any;
  has_loader: boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public loader: LoadingController,
    public helper: HelperService
  ){
    this.has_loader = false;
    if(this.eventsService.learning_informations !== undefined){
      this.learning_informations = this.eventsService.learning_informations;
    }
    this.getLearningInformation();
  }

  ngOnInit() {
  }

  // Get special events data and update the special events state
  getLearningInformation(){
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
    
    this.eventsService.getAllLearningInformationDataFromApi().subscribe(
      data => {
        if(this.has_loader){
          this.loader.dismiss();
        }
        this.learning_informations = this.eventsService.learning_informations;
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
        this.router.navigate(['/learning-information']);
      },
      error => {
        console.log(error);
      },
      () => {}
    );
  }
  
  refreshData(event){
    this.eventsService.getAllLearningInformationDataFromApi().subscribe(
      data => {
        this.learning_informations = this.eventsService.learning_informations;
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
