import { Component, OnInit, ViewChild  } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-seschedule',
  templateUrl: './seschedule.page.html',
  styleUrls: ['./seschedule.page.scss'],
})
export class SESchedulePage implements OnInit {
  @ViewChild(IonContent,{static: true}) content: IonContent;
  event:any;
  schedules:any;
  ongoing_schedule_idx:any;
  show_create_custom_schedule:any;
  show_saved_text:any;
  saved_text:any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public fileTransfer: FileTransfer,
    public loader: LoadingController,
    public alertService: AlertService
  ) {
    if(this.eventsService.current_selected_event_id == undefined){
      this.router.navigate(['/']);
    }
    this.ongoing_schedule_idx = null;
    this.event = this.eventsService.current_selected_event_data;
    this.show_create_custom_schedule = false;
    this.show_saved_text = false;
    this.saved_text = '';
    for(let x = 0; x < this.event.schedules.length; x++){
      this.event.schedules[x].is_active = false;
    }
    /*for(let u_key in this.event.grouped_unselected_schedules){
      this.schedules[u_key]['active'] = false;
    }*/
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
        console.log(this.event);
        for(let x = 0; x < this.event.schedules.length; x++){
          this.event.schedules[x].is_active = false;
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

  // Toggles Schedule `is_active` property
  toggleSched(idx){
    if(this.event.schedules[idx]['is_active']){
      return this.event.schedules[idx]['is_active'] = false;
    }else{
      return this.event.schedules[idx]['is_active'] = true;
    }
    
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

  formatDateKey(date) {
    let dateStri= date.split("-");
    let year = 20+dateStri[2];
    let f = new Date(year, dateStri[0] - 1, dateStri[1]);
    let dateConverted = f.toString()
    return dateConverted;
  }

  // Marks a schedule as selected to be used for custom schedules
  selectCustomSchedule(key,subkey){

    // Return with an alert if trying to deselect a mandatory schedule
    if(this.event.grouped_unselected_schedules[key][subkey].mandatory == 1){
      this.alertService.presentAlert(
        'Mandatory Schedule',
        '',
        'This is a mandatory schedule and cannot be deselected'
      );
      return;
    }

    if(!this.event.grouped_unselected_schedules[key][subkey].selected){

      
      // Verify if a schedule has conflict with existing custom schedules
      let selected_schedule_start_timestamp = this.event.grouped_unselected_schedules[key][subkey].start_timestamp;
      let selected_schedule_end_timestamp = this.event.grouped_unselected_schedules[key][subkey].end_timestamp;
      /*
      for(let c_key in this.event.grouped_custom_schedules){
        for(let c_subkey in this.event.grouped_custom_schedules[c_key]){
          let check_schedule_start_timestamp = this.event.grouped_custom_schedules[c_key][c_subkey].start_timestamp;
          let check_schedule_end_timestamp = this.event.grouped_custom_schedules[c_key][c_subkey].end_timestamp;
            if(check_schedule_start_timestamp <= selected_schedule_end_timestamp &&
            selected_schedule_start_timestamp <= check_schedule_end_timestamp){
              //allow_overlapping_schedule
              if(this.event.grouped_custom_schedules[c_key][c_subkey].allow_overlapping_schedule == 0
              && this.event.grouped_unselected_schedules[key][subkey].allow_overlapping_schedule == 0){
                this.alertService.presentAlert(
                  'Schedule Conflict',
                  '',
                  'This schedule is in conflict with '+this.event.grouped_custom_schedules[c_key][c_subkey].title
                );
                return;
              }
            }
        }
      }*/
      // Verify schedule has conflict with unsaved selected custom schedules
      /*for(let u_key in this.event.grouped_unselected_schedules){
        for(let u_subkey in this.event.grouped_unselected_schedules[u_key]){
          if(this.event.grouped_unselected_schedules[u_key][u_subkey].selected){
            let check_schedule_start_timestamp = this.event.grouped_unselected_schedules[u_key][u_subkey].start_timestamp;
            let check_schedule_end_timestamp = this.event.grouped_unselected_schedules[u_key][u_subkey].end_timestamp;
             if(check_schedule_start_timestamp <= selected_schedule_end_timestamp &&
              selected_schedule_start_timestamp <= check_schedule_end_timestamp){
                if(this.event.grouped_unselected_schedules[u_key][u_subkey].allow_overlapping_schedule == 0
                && this.event.grouped_unselected_schedules[key][subkey].allow_overlapping_schedule == 0){
                  this.alertService.presentAlert(
                    'Schedule Conflict',
                    '',
                    'This schedule is in conflict with '+this.event.grouped_unselected_schedules[u_key][u_subkey].title
                  );
                  return;
                }
              }
          }
        }
      }*/
      this.event.grouped_unselected_schedules[key][subkey].selected = true;
    }else{
      this.event.grouped_unselected_schedules[key][subkey].selected = false;
    }
  }

  // Submit and save custom schedule
  submitCustomSchedule(){
    let data = [];
    this.show_saved_text = false;
    // loop through the grouped_schedules object to check for selected schedules
    for(let key in this.event.grouped_unselected_schedules){
      for(let subkey in this.event.grouped_unselected_schedules[key]){
        if(this.event.grouped_unselected_schedules[key][subkey].selected){
          data.push(
            {
              'event_schedule_id':this.event.grouped_unselected_schedules[key][subkey].id,
              'event_id':this.event.grouped_unselected_schedules[key][subkey].event_id,
            }
          )
        }
      }
    }
    this.loader.create({
      message: 'Saving'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.eventsService.saveCustomEventSchedule(data).subscribe(
      data => {},
      error => {
        this.loader.dismiss();
        console.log(error)
      },
      () => {
        this.show_create_custom_schedule = false;
        this.saved_text = "Schedule Saved";
        this.loader.dismiss();
        this.refreshData();
        this.content.scrollToTop(400);
        this.showSuccessMessage();
      }
      
    );
  }

  // Show create custom schedule form
  showCreateCustomSchedule(){
    this.show_create_custom_schedule = true;
  }

  // Removes custom event schedule
  deleteCustomEventSchedule(id,key,subkey){

    if(this.event.grouped_custom_schedules[key][subkey].mandatory == 1){
      this.alertService.presentAlert(
        'Mandatory Schedule',
        '',
        'This is a mandatory schedule and cannot be removed'
      );
      return;
    }



    this.show_saved_text = false;
    this.loader.create({
      message: 'Deleting'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.eventsService.deleteCustomEventSchedule(id).subscribe(
      data => {},
      error => {
        this.loader.dismiss();
        console.log(error)
      },
      () => {
        this.show_create_custom_schedule = false;
        this.saved_text = "Schedule Removed";
        this.loader.dismiss();
        this.refreshData();
        this.content.scrollToTop(400);
        this.showSuccessMessage();
      }
    );
  }

  showSuccessMessage(){
    this.show_saved_text = true;
    setTimeout(() => {
      this.hideSuccessMessage();
     }, 3000);
  }

  hideSuccessMessage(){
    this.show_saved_text = false;
  }
}
