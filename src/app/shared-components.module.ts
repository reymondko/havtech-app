import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventTabsComponent } from 'src/app/components/event-tabs/event-tabs.component';
import { EventMenusComponent } from 'src/app/components/event-menus/event-menus.component';
import { EventGalleryComponent } from 'src/app/components/event-gallery/event-gallery.component';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EventFooterComponent } from 'src/app/components/event-footer/event-footer.component';

import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    EventTabsComponent,
    EventMenusComponent,
    EventGalleryComponent,
    ImageUploadComponent,
    HeaderComponent,
    EventFooterComponent
  ],
  exports: [
    EventTabsComponent,
    EventMenusComponent,
    EventGalleryComponent,
    ImageUploadComponent,
    HeaderComponent,
    EventFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
    PinchZoomModule
  ],
  
})
export class SharedComponentsModule { }
