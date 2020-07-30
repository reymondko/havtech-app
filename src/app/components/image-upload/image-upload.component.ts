import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { LoadingController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnInit {
  images: any;
  mock_images: any;
  upload_capture_modal: any;
  confirm_upload_modal: any;
  upload_complete_modal: any;
  constructor(
    public camera: Camera,
    public actionSheet: ActionSheetController,
    public imagePicker: ImagePicker,
    public loader: LoadingController,
    public eventsService: EventsService
  ) { 
    this.images = [];
    this.upload_capture_modal = false;
  }

  ngOnInit() {}

  async showUploadCaptureOption(){
    this.images = [];
    const actionSheet = await this.actionSheet.create({
      header: 'Upload Photos',
      buttons: [{
        text: 'Capture Photo',
        icon: 'camera',
        handler: () => {
          this.capturePhoto();
        }
        }, {
        text: 'Select From Gallery',
        icon: 'image',
        handler: () => {
          this.uploadPhotos();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  showModal(){
    this.upload_capture_modal = true;
  }

  hideModal(){
    this.upload_capture_modal = false;
    this.confirm_upload_modal = false;
    this.upload_complete_modal = false;
  }
  
  capturePhoto(){
    this.hideModal();
    this.images = [];
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:1,
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/png;base64,' + imageData;
      this.images.push(base64Image);
    }, (err) => {
      // Handle error
    }).then(
      () => {
        if(this.images.length > 0){
          this.savePhotos();
          // this.confirm_upload_modal = true;
        }
      }
    );
  }

  uploadPhotos(){
    this.hideModal();
    this.images = [];
    const options = {
      quality: 25,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      if(results != 'OK'){
        for (var i = 0; i < results.length; i++) {
          this.images.push('data:image/png;base64,' + results[i]);
        }
      }
    }, (err) => {}).then(
        ()=>{
          if(this.images.length > 0){
            this.savePhotos();
            // this.confirm_upload_modal = true;
          }
        }
    );
  }

  savePhotos(){
    this.loader.create({
      message: 'Uploading'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.eventsService.uploadEventPhotos(this.images).subscribe(
      data => {
        //update event data
        this.eventsService.updateSelectedEventData().subscribe(data=>{
          this.eventsService.current_selected_event_data = data;
        },error => {
          console.log(error)
        },
        () => {})
      },
      error => {
        console.log(error);
        this.loader.dismiss();
        this.hideModal();
      },
      () => {
        this.loader.dismiss();
        this.hideModal();
        this.upload_complete_modal = true;
      }
    );
  }

}
