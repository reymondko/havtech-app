import { Component, OnInit, ViewChildren } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';

import { PinchZoomComponent } from 'ngx-pinch-zoom';

@Component({
  selector: 'app-semap',
  templateUrl: './semap.page.html',
  styleUrls: ['./semap.page.scss'],
})
export class SEMapPage implements OnInit {
  event: any;
  somePinchZoom: PinchZoomComponent;
  zoomed: Boolean;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public browser: InAppBrowser,
    public fileTransfer: FileTransfer,
    public file: File,
    public alertService: AlertService,
    public env: EnvService,
  ) {
    if (this.eventsService.current_selected_event_id === undefined) {
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    this.zoomed = false;
  }
  @ViewChildren(PinchZoomComponent) pinchZoomComponent;

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

  ngAfterViewInit(){
    // this.somePinchZoom = this.pinchZoomComponent.find(elem => elem.id === "pinchZoomArea");
  }

  zoomIn(idx){
    this.pinchZoomComponent._results[idx].toggleZoom();
  }

  zoomOut(idx){
    this.pinchZoomComponent._results[idx].toggleZoom();
  }

  // Route to schedule page 
  goToMap(map_data){
    this.eventsService.setCurrentSelectedMap(map_data);
    this.router.navigate(['/map']);
  }
  /*downloadFromUrl(filename){
    this.browser.create(this.env.API_URL + 'auth/download/' + filename, '_system');
  }*/
  downloadFromUrl(filename){
    this.browser.create(filename, '_system');
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
