import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PinchZoomModule,
    SharedComponentsModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
