import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { SescheduledetailPage } from './sescheduledetail.page';

import { SharedComponentsModule } from 'src/app/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SescheduledetailPage
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
  declarations: [SescheduledetailPage]
})
export class SescheduledetailPageModule {}
