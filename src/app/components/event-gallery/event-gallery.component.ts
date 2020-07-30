import { Component, OnInit, Input, OnChanges,SimpleChanges } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss'],
})
export class EventGalleryComponent implements OnInit {
  @Input() photos: any;
  @Input() preview: Boolean; // Determines if the component is preview only (limit images to 9 and show view all button)
  modal_is_active: Boolean;
  selected_photo_index: any;
  photos_to_show: any;
  constructor(
    public loader: LoadingController
  ) {
    this.modal_is_active = false;
  }

  ngOnInit() {
    if(this.photos){
      this.photos_to_show = [];
      if(this.preview){
        let max_photo_count = 9;
        if(this.photos.length < max_photo_count){
          max_photo_count = this.photos.length;
        }
        for(let x = 0; x < max_photo_count;x++){
          this.photos_to_show.push(this.photos[x]);
        }
      }else{
        this.photos_to_show = this.photos;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.photos.firstChange == false){
      this.photos = changes.photos.currentValue;
      this.photos_to_show = [];
      if(this.preview){
        let max_photo_count = 9;
        if(this.photos.length < max_photo_count){
          max_photo_count = this.photos.length;
        }
        for(let x = 0; x < max_photo_count;x++){
          this.photos_to_show.push(this.photos[x]);
        }
      }else{
        this.photos_to_show = this.photos;
      }
    }
  }

  // @param `idx` index of the selected photo to show
  showPhoto(idx){
    this.showLoader();
    this.selected_photo_index = idx;
    this.modal_is_active = true;
  }

  closePhoto(){
    this.modal_is_active = false;
  }

  nextPhoto(){
    this.showLoader();
    let max_photo_length = this.photos_to_show.length - 1;
    if(this.selected_photo_index == max_photo_length){
      this.selected_photo_index = 0;
    }else{
      this.selected_photo_index = this.selected_photo_index+1;
    }
  }

  previousPhoto(){
    this.showLoader();
    let max_photo_length = this.photos_to_show.length - 1;
    if(this.selected_photo_index == 0){
      this.selected_photo_index = max_photo_length;
    }else{
      this.selected_photo_index = this.selected_photo_index-1;
    }
  }

  viewAll(){
    this.photos_to_show = this.photos;
    this.preview = false;
  }

  hasLoaded(){
    this.loader.dismiss();
  }

  showLoader(){
    this.loader.create({
      message: ''
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

}
