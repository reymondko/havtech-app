import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { SESchedulePage } from './seschedule.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';
import { File } from '@ionic-native/file/ngx';

const routes: Routes = [
  {
    path: '',
    component: SESchedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    PipesModule
  ],
  declarations: [SESchedulePage]
})
export class SESchedulePageModule {}
