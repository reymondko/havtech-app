import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-sescheduledetail',
  templateUrl: './sescheduledetail.page.html',
  styleUrls: ['./sescheduledetail.page.scss'],
})
export class SescheduledetailPage implements OnInit {
  event:any;
  schedule:any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public browser: InAppBrowser,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertService: AlertService,
    public env: EnvService,
    public helper: HelperService
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

  goToUrl(url){
    var pattern = /^((http|https|ftp):\/\/)/;
    if(!pattern.test(url)) {
        url = "http://" + url;
    }
    // Opening a URL and returning an InAppBrowserObject
    this.browser.create(url, '_system');
  }

  downloadFromUrl(filename){
    this.browser.create(this.env.API_URL + 'auth/download/' + filename, '_system');
  }

  download(url,filename) {
    console.log('downloading: ' + filename + ' from ' + url);
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.download(url, this.file.dataDirectory + filename).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.alertService.presentToast('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log(error);
    });
  }
}
