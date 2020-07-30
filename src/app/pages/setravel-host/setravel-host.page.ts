import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-setravel-host',
  templateUrl: './setravel-host.page.html',
  styleUrls: ['./setravel-host.page.scss'],
})
export class SETravelHostPage implements OnInit {
  event:any;
  faqs: any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public actionSheet: ActionSheetController,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertService: AlertService,
    public env: EnvService,
    public browser: InAppBrowser,
  ) {
    if(this.eventsService.current_selected_event_id == undefined){
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    this.faqs = this.event.faqs;

    for(let x = 0; x < this.faqs.length; x++){
      this.faqs[x]['is_active'] = false;
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
        this.faqs = this.event.faqs;
        for(let x = 0; x < this.faqs.length; x++){
          this.faqs[x]['is_active'] = false;
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

  // Toggles FAQ `is_active` property
  toggleFaq(idx){
    if(this.faqs[idx]['is_active']){
      return this.faqs[idx]['is_active'] = false;
    }else{
      return this.faqs[idx]['is_active'] = true;
    }
    
  }

  download(url,filename) {
    console.log('downloading: ' + filename + ' from ' + url);
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + filename).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.alertService.presentToast('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log(error);
    });
  }

  downloadFromUrl(filename){
    this.browser.create(this.env.API_URL + 'auth/download/' + filename, '_system');
  }
}
